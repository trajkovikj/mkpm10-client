"use strict";

/*
for (var key in p) {
    if (p.hasOwnProperty(key)) {
        alert(key + " -> " + p[key]);
    }
}

-- hasOwnProperty se koristi za da se proveri property-to da ne doagja slucajno od prototype
*/

selectors.openCloseSliderButton.click(closeSidebar);

function openSidebar () {
    selectors.sidebar.animate({ "left": "+=15%" }, "slow" );
    selectors.openCloseSliderButton.html("&lt");
    selectors.openCloseSliderButton.unbind("click");
    selectors.openCloseSliderButton.click(closeSidebar);
}

function closeSidebar () {
    selectors.sidebar.animate({ "left": "-=15%" }, "slow" );
    selectors.openCloseSliderButton.html("&gt");
    selectors.openCloseSliderButton.unbind("click");
    selectors.openCloseSliderButton.click(openSidebar);
}

function requestMerenja () {
    // zemi godina
    // zemi mesec
    // zemi tip na prikaz (avg, heatmap, circles)
    // ajax request za podatoci 
    //      success: 
    //          - resetiraj index & requestedMerenja na iterator
    //          - resetiraj UI (slideri, map, ...)
    //      err: 
    //          - error pop-up messgae

    var request = {
        mapType : $('input[name=map-type]:checked', '#radio-map-type').val(),
        city : selectors.citySelector.val(),
        year : selectors.yearSelector.val(),
        month : selectors.monthSelector.val()
    };

    broker.constructMap(request);

}

function nextMerenjeButton () {
    merenjaIterator.next(null, rectangle);
}

function prevMerenjeButton () {
    merenjaIterator.prev(null, rectangle);
}


