"use strict";

finkipm.core.registerModule('mernaStanicaMapTypeModule', function (sandbox) {

    var _cityRepository = sandbox.getRepository('cityRepository');
    var initCity;
    var allCities = [];


    function init(cityId, callback) {

        if(cityId !== null && cityId !== undefined) {

            _cityRepository.get(cityId).then(function(city){

                initCity = city;
                initMarkersForCity(city);
                if(callback) callback();
            });
        } else {

            _cityRepository.getAll().then(function(cities) {

                allCities = cities;
                cities.forEach(function(city) {
                    initMarkersForCity(city);
                });

                if(callback) callback();
            });
        }
    }

    function destroy(callback) {

        googleVariables.stationMarkerCache.getAll().forEach(function (m) {
            m.setContent('');
        });

        googleVariables.stationMarkerCache.clearCache();

        clearLocalVariables();

        if(callback) callback();
    }

    function initMarkersForCity(city) {

        if(!city) return;

        city.merniStanici.forEach(function(station) {
            googleVariables.stationMarkerCache.add(station);
        });
    }

    function clearLocalVariables() {

        initCity = undefined;
        allCities = [];
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
    }

    function renderCity(city, merenje) {

        if(!city) return;

        var stations = city.merniStanici;
        var values = merenje.values;

        for(var i=0; i < stations.length; i++) {
            for(var j=0; j < values.length; j++) {
                if(values[j].stanicaId === stations[i].id) {
                    renderStanica(stations[i], values[j].pmValue);
                }
            }
        }
    }

    function renderStanica(station, pmValue) {

        var marker = googleVariables.stationMarkerCache.get(station.id);
        var content = markerContentPreparator(pmValue);
        marker.setContent(content);
    }

    function clearStationmap() {

        googleVariables.stationMarkerCache.getAll().forEach(function (m) {
            m.setContent('');
        });
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

    function markerContentPreparator(pmValue) {

        var color = colorResolver(pmValue);
        return '<div class="rich-marker" style="background: ' + color + ';">' + pmValue + '</div>';
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


