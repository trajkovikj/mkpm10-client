"use strict";

finkipm.core.registerModule('brokerModule', function (sandbox) {

    var _srednaVrednostModule = finkipm.core.getModule('srednaVrednostModule');
    var _cityModel = finkipm.core.getModel('cityModel');
    var _managedModules = {};
    var _lastNotification;

    function destroyAllModules() {

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

        if(cityId) {
            var city = _cityModel.getById(cityId);

            latLng.lat = city.lat;
            latLng.lng = city.lng;
            zoomLevel = city.zoomLevel;
        }

        googleVariables.map.setCenter(latLng);
        googleVariables.map.setZoom(zoomLevel);
    }

    function startCorrespondingModule(mapType, cityId) {
        destroyAllModules();
        _managedModules[mapType].start(cityId);
    }


    function init() {
        _managedModules[enums.mapType.SREDNA_VREDNOST] = _srednaVrednostModule;
    }

    function destroy() {
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

