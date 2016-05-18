"use strict";

finkipm.utils = {

    loadScript : function (url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    },

    object : function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    },

    inherits : function (childCtor, parentCtor) {
        /* @constructor */
        function tempCtor() {}
        tempCtor.prototype = parentCtor.prototype;
        childCtor.superClass_ = parentCtor.prototype;
        childCtor.prototype = new tempCtor();
        /* @override */
        childCtor.prototype.constructor = childCtor;
    },

    linq : {

        select : function (array, func) {
            var resultArray = [];

            for (var i = 0; i < array.length; i++) {
                resultArray.push(func(array[i]));
            }

            return resultArray;
        },

        first : function (array, func) {
            for (var i = 0; i < array.length; i++) {
                if(func(array[i])) return array[i];
            }
        },

        last : function (array, func) {
            var tempArray = [];

            for (var i = 0; i < array.length; i++) {
                if(func(array[i])) return tempArray.push(array[i]);
            }

            return tempArray.pop();
        },

        where : function (array, func) {
            var resultArray = [];

            for (var i = 0; i < array.length; i++) {
                if(func(array[i])) resultArray.push(array[i]);
            }

            return resultArray;
        },

        removeFirst : function (array, func) {
            for(var i = 0; i < array.length; i++) {
                if(func(array[i])) {
                    array.splice(i, 1);
                    return;
                }
            }
        },

        removeLast : function (array, func) {
            for(var i = array.length - 1; i >= 0; i--) {
                if(func(array[i])) {
                    array.splice(i, 1);
                    return;
                }
            }
        },

        removeAll : function (array, func) {
            for(var i = 0; i < array.length; i++) {
                if(func(array[i])) {
                    array.splice(i, 1);
                }
            }
        }
    }

};

