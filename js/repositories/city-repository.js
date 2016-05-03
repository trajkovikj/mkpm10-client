"use strict";

finkipm.core.registerRepository('cityRepository',(function () {

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

        getAll : function () {

        },

        get : function (id) {

            // call Ajax request
            // success : use mapper to map returned properties to model properties
            // failed : alert err message
        },

        create : function (city) {

        },

        update : function (city) {

        },

        delete : function (id) {

        }
    };
})());


