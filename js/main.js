var openCloseSliderButton = $( "#open-close" );
var sidebar = $("#sidebar");

openCloseSliderButton.click(closeSidebar);

function openSidebar () {
    sidebar.animate({ "left": "+=15%" }, "slow" );
    openCloseSliderButton.html("&lt");
    openCloseSliderButton.unbind( "click" );
    openCloseSliderButton.click(closeSidebar);
}

function closeSidebar () {
    sidebar.animate({ "left": "-=15%" }, "slow" );
    openCloseSliderButton.html("&gt");
    openCloseSliderButton.unbind( "click" );
    openCloseSliderButton.click(openSidebar);
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

    var mapType = $('input[name=map-type]:checked', '#radio-map-type').val();
    var selectedYear = $('#year').val();
    var selectedMounth = $('#mounth').val();

    debugger;

    alert('Не работи серверот!');
}

function nextMerenjeButton () {
    merenjaIterator.next(null, rectangle);
}

function prevMerenjeButton () {
    merenjaIterator.prev(null, rectangle);
}


