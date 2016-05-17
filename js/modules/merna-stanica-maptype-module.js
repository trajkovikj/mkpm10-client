"use strict";

finkipm.core.registerModule('mernaStanicaMapTypeModule', function (sandbox) {

    var _cityRepository = sandbox.getRepository('cityRepository');
    var initCity;
    var allCities = [];
    var heatmapData = [];


    function init(cityId, callback) {

        if(cityId !== null && cityId !== undefined) {

            var cityPromise = _cityRepository.get(cityId);

            cityPromise.then(function(city){

                initCity = city;
                googleVariables.heatmap.create();
                if(callback) callback();
            });
        } else {

            _cityRepository.getAll().then(function(cities) {

                allCities = cities;
                googleVariables.heatmap.create();
                if(callback) callback();
            });
        }
    }

    function destroy(callback) {

        googleVariables.heatmap.destroy();
        clearLocalVariables();

        if(callback) callback();
    }

    function clearLocalVariables() {

        initCity = undefined;
        allCities = [];
        heatmapData = [];
    }

    function render(city, merenje) {

        clearStationmap();

        if(city) {
            renderCity(city, merenje);
        } else {
            for(var i=0; i < allCities.length; i++) {
                renderCity(allCities[i], merenje);
            }
        }

        googleVariables.heatmap.setupData(heatmapData);
    }

    function renderCity(city, merenje) {

        if(!city) return;

        var stanici = city.merniStanici;
        var values = merenje.values;

        for(var i=0; i < stanici.length; i++) {
            for(var j=0; j < values.length; j++) {
                if(values[j].stanicaId === stanici[i].id) {
                    renderStanica(stanici[i], values[j].pmValue);
                }
            }
        }
    }

    function renderStanica(stanica, pmValue) {

        var weight = weightResolver(pmValue);
        heatmapData.push({
            lat : stanica.lat,
            lng : stanica.lng,
            weight : weight
        });
    }

    function clearStationmap() {

        // iscisti gi markerite so labelite
        googleVariables.heatmap.clearData();
        heatmapData = [];
    }

    function colorResolver(pmValue) {

        if (pmValue <= 50) {
            return '#00FF00';
        } else if (pmValue > 50 && pmValue < 200) {
            return '#FFFF00';
        } else {
            return '#FF0000';
        }
    }

    function weightResolver(pmValue) {

        return pmValue;
    }


    function brokerPublichedNewMeasurementEvent(notification) {

        render(initCity, notification);
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


