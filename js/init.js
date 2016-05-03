"use strict";

// libs/*.js
// enums.js
// core.js
// mediator.js
// utils.js
// sandbox.js
// repositories/*.js
// models/*.js
// modules/*.js

// main.js
// init.js

// ???
// iterator.js
// broker.js
// painter.js
// shared-objects.js
// map-setup.js
// requests.js
// marker-test.js

function initMap() {

    var initCity = finkipm.core.getModel('cityModel').getAll()[0];

    googleVariables.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: initCity.lat, lng: initCity.lng},
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        streetViewControl : false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        }
    });

    finkipm.core.startAllModules();




    // north-west : 42.040027, 21.335283
    // south-east : 41.958893, 21.512438
    /*var rectangle = new google.maps.Rectangle({
      strokeColor: '#FFFFFF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: googleVariables.map,
      bounds: {
        north: 42.040027,
        south: 41.958893,
        east: 21.512438,
        west: 21.335283
      }
    });*/

    /*googleVariables.heatmap = new google.maps.visualization.HeatmapLayer({
      data: getSkPoints(),
      map: map,
      maxIntensity : 150,
      radius : 200
    });*/


}






