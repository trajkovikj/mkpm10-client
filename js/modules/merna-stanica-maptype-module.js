"use strict";

finkipm.core.registerModule('mernaStanicaMapTypeModule', function (sandbox) {

    var _cityRepository = sandbox.getRepository('cityRepository');

    function colorResolver(number) {
        if (number <= 50) {
            return '#00FF00';
        } else if (number > 50 && number < 200) {
            return '#FFFF00';
        } else {
            return '#FF0000';
        }
    }


    function init(cityId, callback) {

        if(callback) callback();
    }

    function destroy(callback) {

        if(callback) callback();
    }

    function render(cityId, merenje) {

    }

    function renderRectangle(rectangle, pmValue) {

    }


    function brokerPublichedNewMeasurementEvent(notification) {

    }


    return {

        initListeners : function () {
            sandbox.addListener('brokerModule::station-change-measurement', brokerPublichedNewMeasurementEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('brokerModule::station-change-measurement', brokerPublichedNewMeasurementEvent);
        },

        start : function (cityId, callback) {
            this.initListeners();
            init(cityId, callback);
        },

        destroy : function (callback) {
            this.removeListeners();
            destroy(callback);
        },

        change : function(measurement) {
            render(initCity, notification);
        }
    };
});

