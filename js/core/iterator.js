"use strict";

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
        getIndex : function getIndex() { return _index; },
        setIndex : function setIndex(index) {
            if(typeof index === "number" && index >= 0 && index < _requestedMerenja.length) {
                _index = index;
            }
        },
        getMerenja : function getIndex() { return _requestedMerenja; },
        setMerenja : function setIndex(merenja) { _requestedMerenja = merenja; },


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
            this.setIndex(0);
        }
    };
})();




