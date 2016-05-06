"use strict";

var startup = {

    execute : function () {
        var initCity = finkipm.core.getModel('cityModel').getAll()[0];

        googleVariables.map.setCenter({
            lat: initCity.lat,
            lng: initCity.lng
        });

        googleVariables.map.setZoom(initCity.zoomLevel);

        // finkipm.core.startAllModules();

        finkipm.core.startModule('sidebarModule');
        finkipm.core.startModule('brokerModule');
        finkipm.core.startModule('sliderModule');
        finkipm.core.startModule('displayModule');
    }

};



