var utils = {

    object : function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    },

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
};

