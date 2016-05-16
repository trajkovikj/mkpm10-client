"use strict";

finkipm.core.registerModule('displayModule', function (sandbox) {

    // cache dom elements
    var bodySelector = $("body");
    var displaySelector;

    var templateSource;
    var template;

    /*sandbox.getTemplate('display-template', function(data){
        templateSource = data;
        template = Handlebars.compile(templateSource);
    });*/

    function initTemplates(callback){

        sandbox.getTemplatePromise('display-template').then(function(data) {

            templateSource = data;
            template = Handlebars.compile(templateSource);
            callback();
        });
    }

    function init() {

        var context = {
            date : '',
            pmValue : ''
        };

        var html = template(context);

        bodySelector.append('<div id="display"></div>');
        displaySelector = $("#display");
        displaySelector.html(html);
    }

    function destroy() {

        displaySelector.remove();
        displaySelector = undefined;
    }

    function render(context) {

        var html = template(context);
        displaySelector.html(html);
    }

    function avgChangeMeasurementEvent(measurement) {

        var context = {
            date : formatDate(new Date(measurement.date)),
            pmValue : measurement.pmValue
        };

        render(context);
    }

    function stationChangeMeasurementEvent(notification) {

    }

    function heatmapChangeMeasurementEvent(notification) {

    }

    function formatDate(date) {
        return date.format("dd.mm.yyyy");
    }

    return {

        initListeners : function () {
            sandbox.addListener('brokerModule::avg-change-measurement', avgChangeMeasurementEvent, this);
            sandbox.addListener('brokerModule::station-change-measurement', stationChangeMeasurementEvent, this);
            sandbox.addListener('brokerModule::heatmap-change-measurement', heatmapChangeMeasurementEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('brokerModule::avg-change-measurement', avgChangeMeasurementEvent);
            sandbox.removeListener('brokerModule::station-change-measurement', stationChangeMeasurementEvent);
            sandbox.removeListener('brokerModule::heatmap-change-measurement', heatmapChangeMeasurementEvent);
        },

        start : function () {
            this.initListeners();
            initTemplates(function() {
                init();
            });

        },

        destroy : function () {
            this.removeListeners();
            destroy();
        }
    };
});


/*switch (mapType) {
    case enums.mapType.SREDNA_VREDNOST.value :
        sandbox.notify({
            eventId : 'brokerModule::avg-change-measurement',
            data : merenje
        });
        break;

    case enums.mapType.PO_MERNA_STANICA.value :
        sandbox.notify({
            eventId : 'brokerModule::station-change-measurement',
            data : merenje
        });
        break;

    case enums.mapType.HEATMAP.value :
        sandbox.notify({
            eventId : 'brokerModule::heatmap-change-measurement',
            data : merenje
        });
        break;
}*/
