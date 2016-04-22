
var merenjaIterator = (function () {
    var _index = 0;
    var _requestedMerenja = [];

    function getNextMerenje () {
        if (_requestedMerenja === undefined || _requestedMerenja.length == 0) return;
        if (_index < _requestedMerenja.length - 1) _index++;
        console.log("Index: " + _index);
        return _requestedMerenja[_index];
    };

    function getPrevMerenje () {
        if (_requestedMerenja === undefined || _requestedMerenja.length == 0) return;
        if (_index > 0) _index--;
        console.log("Index: " + _index);
        return _requestedMerenja[_index];
    };

    function getCurrentMerenje () {
        if (_requestedMerenja === undefined || _requestedMerenja.length == 0) return;
        return _requestedMerenja[_index];
    };

    return {
        getIndex : function getIndex() { return _index; },
        setIndex : function setIndex(number) { _index = number; },
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

var merenjaPainter = (function () {

    function paintHtmlNode (htmlNode, merenje) {
        htmlNode.style.backgroundColor = colorResolver(merenje.pmValue);
        selectors.pmValueDisplayElement.html(merenje.pmValue);
    };

    function paintJsNode (jsNode, merenje) {
        jsNode.setOptions({
            fillColor : colorResolver(merenje.pmValue)
        });
        selectors.pmValueDisplayElement.html(merenje.pmValue);
    };

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

        paintNode : function (merenje, htmlNode, jsNode) {
            if (htmlNode !== undefined && htmlNode !== null) {
                paintHtmlNode(htmlNode, merenje);
            } else if (jsNode !== undefined && jsNode !== null) {
                paintJsNode(jsNode, merenje)
            }
        },

        paintSrednaVrednostMapType : function (rectangle, merenje) {
            rectangle.setOptions({
                fillColor : colorResolver(merenje.pmValue)
            });
            selectors.pmValueDisplayElement.html(merenje.pmValue);
        }
    };

})();


var broker = (function () {

    function constructSrednaVrednostMapType (year, month) {

        requests.getAllAvg(year, month).done(function (data) {
            merenjaIterator.resetIteratorData(data);
            merenjaPainter.paintSrednaVrednostMapType(googleVariables.skRectangle, merenjaIterator.current());
        });
    }

    function constructPoMernaStanicaMapType (year, month) {

    }

    function constructHeatmapMapType (year, month) {

    }

    return {
        constructMap : function (mapType, year, month) {
            var requestedMerenja;

            if(mapType == mapTypeEnum.SREDNA_VREDNOST) {

                constructSrednaVrednostMapType(year, month);

            } else if (mapType == mapTypeEnum.PO_MERNA_STANICA) {

                constructPoMernaStanicaMapType(year, month);

            } else if (mapType == mapTypeEnum.HEATMAP) {

                constructHeatmapMapType(year, month);

            } else {
                console.log('broker.changeMapContext: Unknown mapType')
            }


        }
    };
})();