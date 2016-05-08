"use strict";

finkipm.core.registerModule('brokerModule', function (sandbox) {

    var _toastModule = sandbox.getModule('toastModule');

    var _srednaVrednostModule = sandbox.getModule('srednaVrednostModule');
    var _cityRepository = sandbox.getRepository('cityRepository');
    var _managedModules = {};

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
        _managedModules[enums.mapType.SREDNA_VREDNOST.value] = _srednaVrednostModule;
    }

    function destroy() {
        destroyAllManagedModules();
        _managedModules = {};
    }


    function sidebarSubmitRequestEvent(notification) {

        positionMap(notification.request.cityId);
        startCorrespondingModule(notification.request.mapType, notification.request.cityId, function () {

            sandbox.notify({
                eventId : 'broker-request',
                data : notification
            });
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
            this.initListeners();
            init();
        },

        destroy : function () {
            this.removeListeners();
            destroy();
        },

        d : destroyAllManagedModules
    };
});

