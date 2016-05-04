"use strict";

finkipm.core.registerModule('srednaVrednostModule', function (sandbox) {

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

        //

        var html = template({playPause : '', seekLeft : '', seekRight : ''});
        body.append(html);
        sliderSelector = $("#slider");
        sliderButtonSelector = sliderSelector.find("#sliderButton");
        sliderSeekLeftButtonSelector = sliderSelector.find("#seekLeft");
        sliderSeekRightButtonSelector = sliderSelector.find("#seekRight");
        sliderScrollerSelector = sliderSelector.find("#sliderScroller");


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
            sandbox.addListener('sidebar-submit-request', sidebarSubmitRequestEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('sidebar-submit-request', sidebarSubmitRequestEvent);
        },

        start : function () {
            initSlider();
            this.initListeners();
        },

        destroy : function () {
            destroySlider();
            this.removeListeners();
        }
    };
});

