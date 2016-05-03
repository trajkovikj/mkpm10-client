"use strict";

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

    googleVariables.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: models.city.getAll()[0].lat, lng: models.city.getAll()[0].lng},
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        }
    });

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

    init();
}

function init() {

    /*requestedMerenja = requests.getAllAvg();
     merenjaIterator.resetIteratorData(requestedMerenja);
     merenjaIterator.current(null, rectangle);*/

    initMapTypes();
    initSelectors();

    /*var people = [
        {
            name : 'Ana',
            age : 20,
            height : 170,
            weight : 65,
            eyeColor : 'Brown'
        },
        {
            name : 'Bob',
            age : 24,
            height : 184,
            weight : 105,
            eyeColor : 'Green'
        },
        {
            name : 'John',
            age : 29,
            height : 190,
            weight : 110,
            eyeColor : 'Blue'
        }
    ];
    console.log(utils.select(people, function (p) {
        return {
            name : p.name,
            age : p.age
        };
    }));*/

}


function initMapTypes() {

    selectors.logo.after(function () {
        var inputElements = '';

        for(var key in enums.mapType){
            if (enums.mapType.hasOwnProperty(key)) {
                inputElements += '<input type="radio" name="map-type" value="'+ enums.mapType[key].value +'"> ' + enums.mapType[key].description +'<br>';
            }
        }

        return '<div id="radio-map-type">' + inputElements + '</div>';

    });

    selectors.mapTypeRadio = $("#radio-map-type");
    selectors.mapTypeRadio.find("input:radio").first().prop("checked", true);
}

function initSelectors() {
    var allYears;

    requests.getAllMonthsByYears().done(function (data) {
        allYears = data;
    });

    initCitySelector(utils.select(models.city.getAll(), function (c) {
        return { id : c.id, name : c.name };
    }));


    initYearsSelector(utils.select(allYears, function (x) {
        return x.year;
    }));

    initMonthsSelector(formatMonthsArray(allYears[0].months));

    selectors.yearSelector.change(function () {
        var selectedYearId = selectors.yearSelector.find(" :selected").attr("id");
        initMonthsSelector(formatMonthsArray(allYears[selectedYearId].months));
    });

}

function initCitySelector (citiesArray) {
    var i;

    selectors.citySelector.html('');

    for(i = 0; i < citiesArray.length; i++) {
        selectors.citySelector.append('<option id="'+ citiesArray[i].id +'" value="'+ citiesArray[i].id +'">'+ citiesArray[i].name +'</option>');
    }
}

function initYearsSelector (yearsArray) {
    var i;

    selectors.yearSelector.html('');

    for(i = 0; i < yearsArray.length; i++) {
        selectors.yearSelector.append('<option id="'+ i +'" value="'+ yearsArray[i] +'">'+ yearsArray[i] +'</option>');
    }
}

function initMonthsSelector (monthsArray) {
    var i;

    selectors.monthSelector.html('');

    for(i = 0; i < monthsArray.length; i++) {
        selectors.monthSelector.append('<option id="'+ i +'" value="'+ i +'">'+ monthsArray[i] +'</option>');
    }
}


function formatMonthsArray(months) {
    months.unshift('Сите месеци');
    return months;
}

