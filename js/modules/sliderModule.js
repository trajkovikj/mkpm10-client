"use strict";

finkipm.core.registerModule('sliderModule', function (sandbox) {

    // embed iterator

    // cache dom elements
    var sliderSelector = $("#slider");
    var displaySelector = $("#display"); // treba da bide poseben modul
    
    function getCurrentPosition() {
        return 0; // slider peek position
    }

    function render() {

        sliderSelector.slider({
            range: "min",
            value: 1,
            min: 1,
            max: 1,
            slide: function( event, ui ) {
                displaySelector.html("slide :: " + ui.value);
            },
            change: function( event, ui ) {
                displaySelector.html("change :: " + ui.value);
            },
            start: function( event, ui ) {
                displaySelector.html("start :: " + ui.value);
            },
            stop: function( event, ui ) {
                displaySelector.html("stop :: " + ui.value);
            }
        });
    }

    return {
        
        play : function () {
            sandbox.notify({
                eventId : 'slider-play',
                data : getCurrentPosition()
            });
        },
        
        pause : function () {
            sandbox.notify({
                eventId : 'slider-pause',
                data : getCurrentPosition()
            });
        },
        
        changePosition : function () {
            sandbox.notify({
                eventId : 'slider-change-position',
                data : getCurrentPosition()
            });
        },
        
        start : function () {
            render();
            // init event listeners
        },
        
        destroy : function () {
            // disable event listeners
            // remove from dom
        }
    };
});

