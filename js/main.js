"use strict";

selectors.openCloseSliderButton.on("click", closeSidebar);

function openSidebar () {
    selectors.sidebar.animate({ "left": "+=15%" }, "slow" );
    selectors.openCloseSliderButton.html("&lt");
    selectors.openCloseSliderButton.off("click");
    selectors.openCloseSliderButton.on("click", closeSidebar);
}

function closeSidebar () {
    selectors.sidebar.animate({ "left": "-=15%" }, "slow" );
    selectors.openCloseSliderButton.html("&gt");
    selectors.openCloseSliderButton.off("click");
    selectors.openCloseSliderButton.on("click", openSidebar);
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
        mapType : selectors.mapTypeRadio.find("input[name=map-type]:checked").val(),
        cityId : parseInt(selectors.citySelector.val()),
        year : selectors.yearSelector.val(),
        month : selectors.monthSelector.val()
    };

    broker.constructMap(request);

}



