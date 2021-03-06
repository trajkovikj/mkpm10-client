"use strict";

finkipm.core.registerRepository('measurementsRepository',(function () {

    var _utils = finkipm.utils;
    var apiUrl = finkipm.core.config.apiUrl;
    var _promiseCache = {};

    // remove me
    //apiUrl = './';

    var count = 0;


    return {
        getFiltered: getFiltered,

        mapSend: mapSend,
        mapReceive: mapReceive
    };



    /// implementation /////////
    
    function getFiltered(context) {

        var endpoint = endpointUrlAdditionForContext(context);
        var url = apiUrl + endpoint;
        var data = {
            cityId: context.cityId,
            startDate: constructStartDate(context),
            endDate: constructEndDate(context),
            timeUnit: context.timeUnit
        };

        var deferred = $.Deferred();

        var ajaxRequest = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
            type : 'POST',
            url : url,
            data: data,
            dataType : 'json',
            success: deferred.resolve,
            error: deferred.reject
        });

        //_promiseCache[url] = promise;

        var promise = deferred.promise();

        return promise.pipe(function (response) {
            // process, map and return data
            return mapResponse(response, context);
        });
    }

    function constructStartDate(context) {
        var year = context.year;
        var month = context.month === 0 ? '01' : context.month === 12 ? '12' : '0' + context.month;
        var day = '01';

        return  year + '-' + month + '-' + day;
    }

    function constructEndDate(context) {
        var year = context.year;
        var month = context.month === 0 || context.month === 11  ? '12' : '0' + (parseInt(context.month) + 1);
        var day = context.month === 0 ? '31' : '01';

        return  year + '-' + month + '-' + day;
    }

    function endpointUrlAdditionForContext(context) {

        return context.mapType === enums.mapType.SREDNA_VREDNOST.value
            ? 'v1/measurements/filterByCity'
            : 'v1/measurements/filterByStation';
    }



    /// mappers /////////

    function mapSend(measurement) {
        return {
            // mappings here - from app to api
        };
    }

    function mapReceive(measurement) {
        return {
            // mappings here - from api to app (use model properties)
        };
    }

    function mapResponse(response, context) {

        return context.mapType === enums.mapType.SREDNA_VREDNOST.value
            ? _utils.linq.select(response.data, mapReceiveByCity)
            : _utils.linq.select(response.data, mapReceiveByStation);
    }

    function mapReceiveByCity(measurement) {
        return {
            date: measurement.date,
            pmValue:  Math.round(measurement.pmValue * 100) / 100
        }
    }

    function mapReceiveByStation(measurement) {
        return {
            date: measurement.date,
            values: _utils.linq.select(measurement.values, function (value) {
                return {
                    stanicaId: value.stationId,
                    pmValue:  Math.round(value.pmValue * 100) / 100
                };
            })
        }
    }


})());

