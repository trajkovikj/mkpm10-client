"use strict";

finkipm.core.registerModule('sliderModule', function (sandbox) {

    var _templateHandler = finkipm.core.extensions.templateHandler;
    var _localIterator = finkipm.utils.object(finkipm.core.extensions.iterator);
    var _lastNotification;
    var intervalId;

    // cache dom elements
    var body = $("body");
    var sliderSelector;
    var sliderButtonSelector;
    var sliderSeekLeftButtonSelector;
    var sliderSeekRightButtonSelector;
    var sliderScrollerSelector;
    
    var templateSource;
    var template;

    _templateHandler.getTemplate('slider-template', function(data){
        templateSource = data;
        template = Handlebars.compile(templateSource);
    });

    function initSlider() {

        var html = template({playPause : '', seekLeft : '', seekRight : ''});
        body.append(html);
        sliderSelector = $("#slider");
        sliderButtonSelector = sliderSelector.find("#sliderButton");
        sliderSeekLeftButtonSelector = sliderSelector.find("#seekLeft");
        sliderSeekRightButtonSelector = sliderSelector.find("#seekRight");
        sliderScrollerSelector = sliderSelector.find("#sliderScroller");

        // sliderButtonSelector.addClass("ui-icon").addClass("ui-icon-play");
        sliderButtonSelector.button({
            icons : {
                primary : 'ui-icon-play'
            },
            text : false
        });
        sliderButtonSelector.on('click', sliderButtonPlayEvent);

        sliderSeekLeftButtonSelector.button({
            icons : {
                primary : 'ui-icon-seek-prev'
            },
            text : false
        });
        sliderSeekLeftButtonSelector.on('click', sliderPrevious);

        sliderSeekRightButtonSelector.button({
            icons : {
                primary : 'ui-icon-seek-next'
            },
            text : false
        });
        sliderSeekRightButtonSelector.on('click', sliderNext);

        sliderScrollerSelector.slider({
            range: "min",
            value: 0,
            min: 0,
            max: 0,

            slide: function( event, ui ) {

                _localIterator.setIndex(ui.value);
                var merenje = _localIterator.current();

                if(!merenje) return;

                sandbox.notify({
                    eventId : 'slider-change-position',
                    data : merenje
                });
            }

        });
    }

    function destroySlider() {
        sliderSelector.remove();
        sliderButtonSelector.off('click');
        sliderSeekLeftButtonSelector.off('click');
        sliderSeekRightButtonSelector.off('click');
    }

    function render() {

    }

    function sliderButtonPlayEvent() {
        sliderButtonSelector.off('click');
        sliderButtonSelector.on('click', sliderButtonPauseEvent);
        // sliderButtonSelector.html('Pause');

        // sliderButtonSelector.removeClass("ui-icon-play").addClass("ui-icon-pause");
        sliderButtonSelector.button({
            icons : {
                primary : 'ui-icon-pause'
            },
            text : false
        });

        intervalId = setInterval(sliderNext, 1000);
    }

    function sliderButtonPauseEvent() {
        sliderButtonSelector.off('click');
        sliderButtonSelector.on('click', sliderButtonPlayEvent);
        // sliderButtonSelector.html('Play');

        // sliderButtonSelector.removeClass("ui-icon-pause").addClass("ui-icon-play");
        sliderButtonSelector.button({
            icons : {
                primary : 'ui-icon-play'
            },
            text : false
        });

        clearInterval(intervalId);
    }
    
    function sidebarSubmitRequestEvent(notification) {

        // se cuva poslednata notiikacija, bidejki ke bide potrebno pri change event na slider-ot
        // da se znae na koj kanal da se emituva podatokot
        // ova e se poradi razlicniot format na merenja pri razlicen mapType
        _lastNotification = notification;
        _localIterator.resetIteratorData(notification.response)

        sliderScrollerSelector.slider("option", "max", notification.response.length - 1);
        sliderScrollerSelector.slider("option", "min", 0);
        sliderScrollerSelector.slider("option", "value", 0);

        var merenje = _localIterator.current();

        if(!merenje) return;

        sandbox.notify({
            eventId : 'slider-change-position',
            data : merenje
        });
    }

    function sliderNext() {
        var merenje = _localIterator.next();
        if(!merenje) return;

        sliderScrollerSelector.slider("option", "value", _localIterator.getIndex());

        sandbox.notify({
            eventId : 'slider-change-position',
            data : merenje
        });
    }

    function sliderPrevious() {
        var merenje = _localIterator.prev();
        if(!merenje) return;

        sliderScrollerSelector.slider("option", "value", _localIterator.getIndex());

        sandbox.notify({
            eventId : 'slider-change-position',
            data : merenje
        });
    }

    return {

        initListeners : function () {
            sandbox.addListener('broker-request', sidebarSubmitRequestEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('broker-request', sidebarSubmitRequestEvent);
        },
        
        play : function () {
            sandbox.notify({
                eventId : 'slider-play',
                data : {}
            });
        },
        
        pause : function () {
            sandbox.notify({
                eventId : 'slider-pause',
                data : {}
            });
        },
        
        changePosition : function () {
            sandbox.notify({
                eventId : 'slider-change-position',
                data : {}
            });
        },
        
        start : function () {
            initSlider();
            this.initListeners();
            // init event listeners
        },
        
        destroy : function () {
            destroySlider();
            this.removeListeners();
        }
    };
});

