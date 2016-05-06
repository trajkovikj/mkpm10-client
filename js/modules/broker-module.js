"use strict";

finkipm.core.registerModule('brokerModule', function (sandbox) {

    var _srednaVrednostModule = sandbox.getModule('srednaVrednostModule');
    var _cityModel = sandbox.getModel('cityModel');
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

        if(cityId !== null && cityId !== undefined) {
            var city = _cityModel.getById(cityId);

            latLng.lat = city.lat;
            latLng.lng = city.lng;
            zoomLevel = city.zoomLevel;
        }

        googleVariables.map.setCenter(latLng);
        googleVariables.map.setZoom(zoomLevel);
    }

    function startCorrespondingModule(mapType, cityId) {
        destroyAllManagedModules();
        _managedModules[mapType].start(cityId);
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
        startCorrespondingModule(notification.request.mapType, notification.request.cityId);

        sandbox.notify({
            eventId : 'broker-request',
            data : notification
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
            init();
            this.initListeners();
        },

        destroy : function () {
            destroy();
            this.removeListeners();
        }
    };
});

