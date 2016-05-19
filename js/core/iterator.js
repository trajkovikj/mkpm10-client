"use strict";

finkipm.core.extensions.iterator = (function () {
    var _index = -1;
    var _requestedMerenja = [];

    function getNextMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        if (_index < _requestedMerenja.length - 1) _index++;
        return _requestedMerenja[_index];
    }

    function getPrevMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        if (_index > 0) _index--;
        return _requestedMerenja[_index];
    }

    function getCurrentMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        return _requestedMerenja[_index];
    }

    return {
        getIndex : function() { return _index; },
        setIndex : function(index) {
            if(typeof index === "number" && index >= -1 && index < _requestedMerenja.length) {
                _index = index;
            }
        },

        indexOfLastElement : function() {
            return _requestedMerenja.length - 1;
        },

        length : function() {
            return _requestedMerenja.length;
        },

        getMerenja : function() { return _requestedMerenja; },
        setMerenja : function(merenja) { _requestedMerenja = merenja; },


        next : function () {
            return  getNextMerenje();
        },

        prev : function () {
            return getPrevMerenje();
        },

        current : function () {
            return getCurrentMerenje();
        },

        resetIteratorData : function (data) {
            this.setMerenja(data);
            this.setIndex(data.length === 0 ? -1 : 0);
        }
    };
})();






/*
finkipm.core.extensions.iterator = (function () {
    var _index = 0;
    var _requestedMerenja = [];

    function getNextMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        if (_index < _requestedMerenja.length - 1) _index++;
        return _requestedMerenja[_index];
    }

    function getPrevMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        if (_index > 0) _index--;
        return _requestedMerenja[_index];
    }

    function getCurrentMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        return _requestedMerenja[_index];
    }

    return {
        getIndex : function() { return _index; },
        setIndex : function(index) {
            if(typeof index === "number" && index >= 0 && index < _requestedMerenja.length) {
                _index = index;
            }
        },

        indexOfLastElement : function() {
            return _requestedMerenja.length - 1;
        },

        length : function() {
            return _requestedMerenja.length;
        },

        getMerenja : function() { return _requestedMerenja; },
        setMerenja : function(merenja) { _requestedMerenja = merenja; },


        next : function () {
            return  getNextMerenje();
        },

        prev : function () {
            return getPrevMerenje();
        },

        current : function () {
            return getCurrentMerenje();
        },

        resetIteratorData : function (data) {
            this.setMerenja(data);
            //_index = 0;
            this.setIndex(0);
        }
    };
})();
*/



