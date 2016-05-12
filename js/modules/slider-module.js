"use strict";

finkipm.core.registerModule('sliderModule', function (sandbox) {

    var _localIterator = sandbox.getIterator();
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

    /*sandbox.getTemplate('slider-template', function(data){
        templateSource = data;
        template = Handlebars.compile(templateSource);
    });*/

    function initTemplates(callback){

        sandbox.getTemplatePromise('slider-template').then(function(data) {

            templateSource = data;
            template = Handlebars.compile(templateSource);
            callback();
        });
    }

    function init() {

        var html = template({playPause : '', seekLeft : '', seekRight : ''});
        body.append(html);
        sliderSelector = $("#slider");
        sliderButtonSelector = sliderSelector.find("#sliderButton");
        sliderSeekLeftButtonSelector = sliderSelector.find("#seekLeft");
        sliderSeekRightButtonSelector = sliderSelector.find("#seekRight");
        sliderScrollerSelector = sliderSelector.find("#sliderScroller");

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

                publishIndex();
            }

        });
    }

    function destroy() {
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

        sliderButtonSelector.button({
            icons : {
                primary : 'ui-icon-pause'
            },
            text : false
        });

        intervalId = setInterval(sliderNext, 300);
    }

    function sliderButtonPauseEvent() {
        sliderButtonSelector.off('click');
        sliderButtonSelector.on('click', sliderButtonPlayEvent);

        sliderButtonSelector.button({
            icons : {
                primary : 'ui-icon-play'
            },
            text : false
        });

        clearInterval(intervalId);
    }
    
    function brokerRequestEvent(notification) {

        // se cuva poslednata notiikacija, bidejki ke bide potrebno pri change event na slider-ot
        // da se znae na koj kanal da se emituva podatokot
        // ova e se poradi razlicniot format na merenja pri razlicen mapType
        _lastNotification = notification;
        _localIterator.resetIteratorData(notification.response);

        sliderScrollerSelector.slider("option", "max", notification.response.length - 1);
        sliderScrollerSelector.slider("option", "min", 0);
        sliderScrollerSelector.slider("option", "value", 0);

        var merenje = _localIterator.current();

        if(!merenje) return;

        publishIndex();
    }

    function sliderNext() {
        var merenje = _localIterator.next();
        if(!merenje) return;

        sliderScrollerSelector.slider("option", "value", _localIterator.getIndex());

        publishIndex();
    }

    function sliderPrevious() {
        var merenje = _localIterator.prev();
        if(!merenje) return;

        sliderScrollerSelector.slider("option", "value", _localIterator.getIndex());

        publishIndex();
    }


    function publishChangePosition(data) {
        sandbox.notify({
            eventId : 'sliderModule::change-position',
            data : data
        });
    }

    function publishIndex() {
        sandbox.notify({
            eventId : 'sliderModule::change-position',
            data : {
                index : _localIterator.getIndex()
            }
        });
    }


    return {

        initListeners : function () {
            sandbox.addListener('brokerModule::submit-request', brokerRequestEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('brokerModule::submit-request', brokerRequestEvent);
        },
        
        start : function () {
            this.initListeners();
            initTemplates(function() {
                init();
            });
        },
        
        destroy : function () {
            this.removeListeners();
            destroy();
        }
    };
});



