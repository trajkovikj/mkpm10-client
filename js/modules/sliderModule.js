"use strict";

finkipm.core.registerModule('sliderModule', function (sandbox) {

    // cache dom elements
    
    function getCurrentPosition() {
        return 0; // slider peek position
    }

    function render() {

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
            // init event listeners
            // render
        },
        
        destroy : function () {
            // disable event listeners
            // remove from dom
        }
    };
});

