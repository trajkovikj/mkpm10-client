"use strict";

/*var selectors = {
    logo : $("#logo"),
    sidebar :  $("#sidebar"),
    pmValueDisplayElement : $("#pm-value"),
    openCloseSliderButton : $("#open-close"),
    mapTypeRadio : undefined,
    citySelector : $("#city"),
    yearSelector : $("#year"),
    monthSelector : $("#month")
};*/

var googleVariables = {
    map : {},
    cityRectangleCache : (function () {
        var _cache = [];

        return {

            cacheSetup : function (cityRectangleArray) {
                _cache = cityRectangleArray;
            },

            get : function (id) {
                var cityRectangle = finkipm.utils.linq.first(_cache, function (cr) {
                    return cr.id === id;
                });

                if(cityRectangle) return cityRectangle.rectangle;
            },

            getAll : function () {
                return finkipm.utils.linq.select(_cache, function (cr) {
                    return cr.rectangle;
                });
            },

            getAllWithCityId : function () {
                return finkipm.utils.object(_cache);
            },

            add : function (city) {
                var cityRectangle = {},
                    rectangle;

                if(city) {

                    var cached = this.get(city.id);
                    if(cached) return cached.rectangle;

                    rectangle = new google.maps.Rectangle({
                        strokeColor: '#FFFFFF',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        //fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: googleVariables.map,
                        bounds: {
                            north: city.rectangleBounds.north,
                            south: city.rectangleBounds.south,
                            east: city.rectangleBounds.east,
                            west: city.rectangleBounds.west
                        }
                    });

                    cityRectangle.id = city.id;
                    cityRectangle.rectangle = rectangle;

                    _cache.push(cityRectangle);
                    return cityRectangle.rectangle;
                }
            },

            remove : function (id) {
                finkipm.utils.linq.removeFirst(_cache, function (cr) {
                    return cr.id === id;
                })
            },

            clearCache : function() {
                _cache = [];
            }
        };
    })(),
    heatmap : {}
};

