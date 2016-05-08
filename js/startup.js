"use strict";

var startup = {

    execute : function () {
        var initCity = finkipm.core.getModel('cityModel').getAll()[0];

        googleVariables.map.setCenter({
            lat: initCity.lat,
            lng: initCity.lng
        });

        googleVariables.map.setZoom(initCity.zoomLevel);

        // finkipm.core.startAllModules();

        finkipm.core.startModule('sidebarModule');
        finkipm.core.startModule('brokerModule');
        finkipm.core.startModule('sliderModule');
        finkipm.core.startModule('displayModule');
    }

};

/*


mapType
city (ponatamu moze da ima i all cities)
year
month/allmonths
hour/day (enum; show only if concrete month selected)





/// todo ///////////////////

1. odredi go interfejsot za serverot (ruti & podatoci), kako i interfejsot pomegju modelite preku medijatorot
2. sredi gi repozitorijata da koristat ajax
3. izbrisi gi modelite i prevrti gi vo repository-ja
4. kreiraj gi modulite za merenjaPoStanica i heatmap
5. sredi go css-ot & app da bide responsive
6. sredi sidebar animacijata za openClose
7. kreiraj repository za merni stanici
8. sredi go cityRectangleCache



sredna vrednost :

    konkreten grad :

    merenja = [{
        date : ...
        value : ...
    },
    ... ]


    site gradovi :   // ke razmislime
       



po merna stanica :

    konkreten grad :

        merenja = [{
            date : ...
            values : [{
                stanicaId : ..., 
                pmValue : ...
            }, ... ]
        },
        ... ]



    site gradovi :   // nema
      


heatmap : // isto kako po stanica samo pmValue da se mapira vo odreden heatmap weight

    konkreten grad :

         merenja = [{
             date : ...
             values : [{
                 stanicaId : ..., 
                 pmValue : ...
             }, ... ]
         },
         ... ]

    site gradovi :   // nema

*/
