"use strict";

var startup = {

    execute : function () {
        var initCity = finkipm.core.getModel('cityModel').getAll()[0];

        googleVariables.map.setCenter({
            lat: initCity.lat,
            lng: initCity.lng
        });

        googleVariables.map.setZoom(12);

        finkipm.core.startAllModules();
    }

};



