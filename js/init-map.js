"use strict";

function initMap() {

    googleVariables.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: {lat: 41.656496643649355, lng: 21.45080527343749},
        mapTypeId: google.maps.MapTypeId.SATELLITE, // SATELLITE, MAP
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


    var homeLatLng = new google.maps.LatLng(41.9925, 21.423611);

    var marker1 = new MarkerWithLabel({
        position: homeLatLng,
        draggable: true,
        raiseOnDrag: true,
        map: googleVariables.map,
        labelContent: "$425K",
        labelAnchor: new google.maps.Point(22, 0),
        labelClass: "labels", // the CSS class for the label
        labelStyle: {opacity: 0.75}
    });

    var iw1 = new google.maps.InfoWindow({
        content: "Home For Sale"
    });
    google.maps.event.addListener(marker1, "click", function (e) { iw1.open(googleVariables.map, this); });






    startup.execute();


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






