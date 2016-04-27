"use strict";

var merenjaIterator = (function () {
    var _index = 0;
    var _requestedMerenja = [];

    function getNextMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        if (_index < _requestedMerenja.length - 1) _index++;
        return _requestedMerenja[_index];
    };

    function getPrevMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        if (_index > 0) _index--;
        return _requestedMerenja[_index];
    };

    function getCurrentMerenje () {
        if ( !_requestedMerenja || _requestedMerenja.length == 0) return;
        return _requestedMerenja[_index];
    };

    return {
        getIndex : function getIndex() { return _index; },
        setIndex : function setIndex(index) { _index = index; },
        getRequestedMerenja : function getIndex() { return _requestedMerenja; },
        setRequestedMerenja : function setIndex(merenja) { _requestedMerenja = merenja; },


        next : function () {

            return  getNextMerenje();

           /* var merenje = getNextMerenje();
            if (merenje === undefined) return;

            merenjaPainter.paintNode(merenje, htmlNode, jsNode);*/
        },
        prev : function () {

            return getPrevMerenje();

            /*var merenje = getPrevMerenje();
            if (merenje === undefined) return;

            merenjaPainter.paintNode(merenje, htmlNode, jsNode);*/
        },
        current : function () {

            return getCurrentMerenje();

            /*var merenje = getCurrentMerenje();
            if (merenje === undefined) return;

            merenjaPainter.paintNode(merenje, htmlNode, jsNode);*/
        },
        resetIteratorData : function (data) {
            this.setRequestedMerenja(data);
            this.setIndex(0);
        }
    };
})();




