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

odredi go interfejsot za serverot (ruti & podatoci), kako i interfejsot pomegju modelite preku medijatorot
- sredi gi repozitorijata da koristat ajax
- izbrisi gi modelite i prevrti gi vo repository-ja
kreiraj gi modulite za merenjaPoStanica i heatmap
kreiraj repository za merni stanici
sredi go cityRectangleCache
sredi go css-ot & app da bide responsive
sredi sidebar animacijata za openClose




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


/*

/// GENERATORS ////////////////////
/// the net ninja ////////////////

ex. 1

 function* gen() {
     console.log("init");
     var x = yield 10;
     console.log(x);
 }

 var myGen = gen();
 console.log(myGen.next());
 console.log(myGen.next(5));



 ex. 2


 genWrap(function() {

     var tweets = yield $.get("data/tweets.json");
     console.log(tweets);
     var friends = yield $.get("data/friends.json");
     console.log(friends);
     var videos = yield $.get("data/videos.json");
     console.log(videos);
 });


 function genWrap(generator) {

     var gen = generator();

     function handle(yieleded) {
         if(!yieleded.done) {
             yieleded.value.then(function(data) {
                return handle(gen.next(data));
             });
         }
     }

     return handle(gen.next());
 }


 */


