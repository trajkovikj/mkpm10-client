"use strict";

finkipm.core.registerModule('brokerModule', function (sandbox) {

    var _toastModule = sandbox.getModule('toastModule');

    var _srednaVrednostMapTypeModule = sandbox.getModule('srednaVrednostMapTypeModule');
    var _heatmapMapTypeModule = sandbox.getModule('heatmapMapTypeModule');
    var _mernaStanicaMapTypeModule = sandbox.getModule('mernaStanicaMapTypeModule');

    var _cityRepository = sandbox.getRepository('cityRepository');
    var _managedModules = {};

    var _localIterator = sandbox.getIterator();
    var _lastSidebarNotification;

    function destroyAllManagedModules() {

        for(var key in _managedModules) {
            if(_managedModules.hasOwnProperty(key)) {
                _managedModules[key].destroy();
            }
        }
    }

    function positionMap(cityId) {

        var zoomLevel = 9;
        var latLng = {
            lat: 41.656496643649355,
            lng: 21.45080527343749
        };

        if(cityId === null && cityId === undefined) {

            googleVariables.map.setCenter(latLng);
            googleVariables.map.setZoom(zoomLevel);
            return;
        }

        var cityPromise = _cityRepository.get(cityId);

        cityPromise.then(function(city){
            latLng.lat = city.lat;
            latLng.lng = city.lng;
            zoomLevel = city.zoomLevel;

            googleVariables.map.setCenter(latLng);
            googleVariables.map.setZoom(zoomLevel);
        });

        /*cityPromise.fail(function(jqXHR, textStatus, errorThrown){
            // _toastModule.createToast(textStatus, 1000);
        });*/

    }

    function startCorrespondingModule(mapType, cityId, callback) {
        destroyAllManagedModules();
        _managedModules[mapType].start(cityId, callback);
    }


    function init() {
        _managedModules[enums.mapType.SREDNA_VREDNOST.value] = _srednaVrednostMapTypeModule;
        _managedModules[enums.mapType.HEATMAP.value] = _heatmapMapTypeModule;
        _managedModules[enums.mapType.PO_MERNA_STANICA.value] = _mernaStanicaMapTypeModule;
    }

    function destroy() {
        destroyAllManagedModules();
        _managedModules = {};
    }


    function sidebarSubmitRequestEvent(notification) {


        positionMap(notification.request.cityId);
        startCorrespondingModule(notification.request.mapType, notification.request.cityId, function () {

            _lastSidebarNotification = notification;
            _localIterator.resetIteratorData(notification.response);

            sandbox.notify({
                eventId : 'brokerModule::submit-request',
                data : notification
            });
        });
    }


    function sliderChangePositionEvent(notification) {

        if(!_lastSidebarNotification) return;

        _localIterator.setIndex(notification.index);
        var merenje = _localIterator.current();
        publishMeasurementOnCorrespondingModule(parseInt(_lastSidebarNotification.request.mapType), merenje);
    }

    function publishMeasurementOnCorrespondingModule(mapType, merenje) {

        switch (mapType) {
            case enums.mapType.SREDNA_VREDNOST.value :
                sandbox.notify({
                    eventId : 'brokerModule::avg-change-measurement',
                    data : merenje
                });
                break;

            case enums.mapType.PO_MERNA_STANICA.value :
                sandbox.notify({
                    eventId : 'brokerModule::station-change-measurement',
                    data : merenje
                });
                break;

            case enums.mapType.HEATMAP.value :
                sandbox.notify({
                    eventId : 'brokerModule::heatmap-change-measurement',
                    data : merenje
                });
                break;
        }
    }


    return {

        initListeners : function () {
            sandbox.addListener('sidebarModule::submit-request', sidebarSubmitRequestEvent, this);
            sandbox.addListener('sliderModule::change-position', sliderChangePositionEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('sidebarModule::submit-request', sidebarSubmitRequestEvent);
            sandbox.removeListener('sliderModule::change-position', sliderChangePositionEvent);
        },

        start : function () {
            this.initListeners();
            init();
        },

        destroy : function () {
            this.removeListeners();
            destroy();
        },

        d : function () {
            destroyAllManagedModules();
        }

    };
});

