"use strict";

finkipm.core.registerRepository('dateRepository',(function () {

    function mapSend(city) {
        return {
            // mappings here - from app to api
        };
    }

    function mapReceive(city) {
        return {
            // mappings here - from api to app (use model properties)
        };
    }

    return {

        getAllYearsWithMonths : function () {

            var data = [
                {
                    year: '2013',
                    months : ['Јануари', 'Фебруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
                },
                {
                    year: '2014',
                    months : ['Јануари', 'Фебруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
                },
                {
                    year: '2015',
                    months : ['Јануари', 'Фебруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
                },
                {
                    year: '2016',
                    months : ['Јануари', 'Фебруари', 'Март', 'Април', 'Мај']
                }
            ];

            return {
                done : function (callback) {
                    callback(data);
                },

                fail : function (callback) {
                    var jqXHR, textStatus, errorThrown;
                    callback(jqXHR, textStatus, errorThrown);
                }
            }
        }
    };

})());


