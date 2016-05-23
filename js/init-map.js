"use strict";

function initMap() {

    googleVariables.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: {lat: 41.656496643649355, lng: 21.45080527343749},
        mapTypeId: google.maps.MapTypeId.MAP, // SATELLITE, MAP
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


    requirejs(['./libs/rich-marker.js'], function() {

        startup.execute();
    });

    /*finkipm.utils.loadScript('./libs/rich-marker.js', function() {

        startup.execute();
    });*/



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






