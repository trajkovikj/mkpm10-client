var map, heatmap, rectangle;
var requestedMerenja, allMounthsByYears;
var year;
var yearSelector = $( "#year" );
var mounthSelector = $( "#mounth" );
// var requestedMerenja, requestedMerenjaIndex = 0;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
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
    rectangle = new google.maps.Rectangle({
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

    heatmap = new google.maps.visualization.HeatmapLayer({
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
    var initMounths, initYears = [];

    allMounthsByYears = requests.getAllMounthsByYears();

    for(j in allMounthsByYears) {
        initYears.push(allMounthsByYears[j].year);
    }

    initYearsSelector(initYears);

    initMounths = allMounthsByYears[0].mounths;
    initMounths.unshift('Сите месеци');
    initMounthsSelector(initMounths);

    yearSelector.change(function () {
        var selectedYearId = $("#year option:selected").attr("id");
        var mounths = allMounthsByYears[selectedYearId].mounths;
        mounths.unshift('Сите месеци');
        initMounthsSelector(mounths);
    });

}

function initYearsSelector (yearsArray) {
    var i;

    yearSelector.html('');

    for(i = 0; i < yearsArray.length; i++) {
        yearSelector.append('<option id="'+ i +'" value="'+ yearsArray[i] +'">'+ yearsArray[i] +'</option>');
    }
}

function initMounthsSelector (mounthsArray) {
    var i;

    mounthSelector.html('');

    for(i = 0; i < mounthsArray.length; i++) {
        mounthSelector.append('<option id="'+ i +'" value="'+ mounthsArray[i] +'">'+ mounthsArray[i] +'</option>');
    }
}

