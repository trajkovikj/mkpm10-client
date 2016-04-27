"use strict";

var merenjaPainter = (function () {

    function colorResolver(number) {
        if (number <= 50) {
            return '#00FF00';
        } else if (number > 50 && number < 200) {
            return '#FFFF00';
        } else {
            return '#FF0000';
        }
    }

    return {

        paintSrednaVrednostMapType : function (rectangle, merenje) {
            rectangle.setOptions({
                fillColor : colorResolver(merenje.pmValue)
            });
            selectors.pmValueDisplayElement.html(merenje.pmValue);
        }
    };

})();