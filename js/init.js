var map, heatmap, rectangle;
var requestedMerenja, allMonthsByYears;
var year;
var yearSelector = $( "#year" );
var monthSelector = $( "#month" );

function initMap() {
    googleVariables.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 41.999218, lng: 21.429010},
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        }
    });

    // north-west : 42.040027, 21.335283
    // south-east : 41.958893, 21.512438
    googleVariables.rectangle = new google.maps.Rectangle({
      strokeColor: '#FFFFFF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      //fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      bounds: {
        north: 42.040027,
        south: 41.958893,
        east: 21.512438,
        west: 21.335283
      }
    });

    googleVariables.heatmap = new google.maps.visualization.HeatmapLayer({
      data: getSkPoints(),
      map: map,
      maxIntensity : 150,
      radius : 200
    });

    requestedMerenja = requests.getAllAvg();
    merenjaIterator.resetIteratorData(requestedMerenja);
    merenjaIterator.current(null, rectangle);

    console.log("Index: " + merenjaIterator.getIndex());

    initSelectors();
    
}


function initSelectors() {
    var i, j;
    var initMonths, initYears = [];

    allMonthsByYears = requests.getAllMonthsByYears();

    for(j in allMonthsByYears) {
        initYears.push(allMonthsByYears[j].year);
    }

    initYearsSelector(initYears);

    initMonths = allMonthsByYears[0].months;
    initMonths.unshift('Сите месеци');
    initMonthsSelector(initMonths);

    yearSelector.change(function () {
        var selectedYearId = $("#year option:selected").attr("id");
        var months = allMonthsByYears[selectedYearId].months;
        months.unshift('Сите месеци');
        initMonthsSelector(months);
    });

}

function initYearsSelector (yearsArray) {
    var i;

    yearSelector.html('');

    for(i = 0; i < yearsArray.length; i++) {
        yearSelector.append('<option id="'+ i +'" value="'+ yearsArray[i] +'">'+ yearsArray[i] +'</option>');
    }
}

function initMonthsSelector (monthsArray) {
    var i;

    monthSelector.html('');

    for(i = 0; i < monthsArray.length; i++) {
        monthSelector.append('<option id="'+ i +'" value="'+ monthsArray[i] +'">'+ monthsArray[i] +'</option>');
    }
}

