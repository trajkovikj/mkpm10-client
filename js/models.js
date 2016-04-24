"use strict";

var models = {

    city : (function () {

        var _list = [
            {
                id : 0,
                name : 'Скопје',
                lat: 41.999218,
                lng: 21.429010,
                merniStanici : [
                    {
                        id : 0,
                        description : 'Карпош',
                        lat: 42.006667,
                        lng: 21.386944
                    },
                    {
                        id : 1,
                        description : 'Центар',
                        lat: 41.9925,
                        lon: 21.423611
                    }
                ],
                zoomLevel : 13,
                rectangleBounds : {
                    north: 42.040027,
                    south: 41.958893,
                    east: 21.512438,
                    west: 21.335283
                }
            }
        ];

        return {

            getAll : function () {
                return _list;
            },
            getById : function (id) {
                for(var i=0; i < _list.length; i++) {
                    if (_list[i].id === id) return _list[i];
                }
            }
        };

    })()

};