"use strict";

finkipm.core.registerModule('srednaVrednostModule', function (sandbox) {

    var _cityModel = sandbox.getModel('cityModel');
    var initCity;


    function colorResolver(number) {
        if (number <= 50) {
            return '#00FF00';
        } else if (number > 50 && number < 200) {
            return '#FFFF00';
        } else {
            return '#FF0000';
        }
    }


    function init(cityId) {

        initCity = cityId;

        if(cityId !== null && cityId !== undefined) {
            // kreiraj rectangle za konkretniot grad
            var city = _cityModel.getById(cityId);
            googleVariables.cityRectangleCache.add(city);
        } else {
            // kreiraj rectangles za site gradovi
            var cities = _cityModel.getAll();
            for(var i=0; i < cities.length; i++)
            {
                googleVariables.cityRectangleCache.add(cities[i]);
            }
        }
    }

    function destroy() {
        // destroy all rectangles
        googleVariables.cityRectangleCache.getAll().forEach(function (r) {
            r.setMap(null);
        });
        
        googleVariables.cityRectangleCache.clearCache();
    }

    function render(cityId, merenje) {

        // se raboti za konkreten grad, taka da objektot merenje treba da izgleda vaka:
        // {date : new Date(05.05.2016), pmValue : 30}

        // merenje za site gradovi
        // { cityId : {date : new Date(05.05.2016), pmValue : 30}, cityId : {date : new Date(05.05.2016), pmValue : 30}, cityId : {date : new Date(05.05.2016), pmValue : 30} }

        if(cityId !== null && cityId !== undefined) {
            var rectangle = googleVariables.cityRectangleCache.get(cityId);
            renderRectangle(rectangle, merenje.pmValue);
        } else {
            var cityRectangleList = googleVariables.cityRectangleCache.getAllWithCityId();
            cityRectangleList.forEach(function(cr) {
                var pmValue = merenje[cr.id].pmValue;
                renderRectangle(cr.rectangle, pmValue);
            });
        }
    }

    function renderRectangle(rectangle, pmValue) {

        rectangle.setOptions({
            fillColor : colorResolver(pmValue)
        });
    }


    function sliderChangedPositionEvent(notification) {

        render(initCity, notification);
    }


    return {

        initListeners : function () {
            sandbox.addListener('slider-change-position', sliderChangedPositionEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('slider-change-position', sliderChangedPositionEvent);
        },

        start : function (cityId) {
            init(cityId);
            this.initListeners();
        },

        destroy : function () {
            destroy();
            this.removeListeners();
        }
    };
});

