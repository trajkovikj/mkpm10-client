"use strict";

finkipm.core.registerModule('displayModule', function (sandbox) {

    var _linq = sandbox.linq;
    // cache dom elements
    var bodySelector = $("body");
    var displaySelector;
    var contentSelector;
    var showHideButtonSelector;

    var templateSource;
    var template;
    var singleValueTemplateSource;
    var singleValueTemplate;
    var valueByStationTemplateSource;
    var valueByStationTemplate;

    function initTemplates(callback){

        sandbox.getTemplatePromise('display-template').then(function(data) {

            templateSource = data;
            template = Handlebars.compile(templateSource);
            return sandbox.getTemplatePromise('display-single-value-template');

        }).then(function (data) {

            singleValueTemplateSource = data;
            singleValueTemplate = Handlebars.compile(singleValueTemplateSource);
            return sandbox.getTemplatePromise('display-value-by-station-template');

        }).then(function (data) {

            valueByStationTemplateSource = data;
            valueByStationTemplate = Handlebars.compile(valueByStationTemplateSource);
            callback();
        });
    }

    function init() {

        var html = template();

        bodySelector.append(html);
        displaySelector = $("#display");
        showHideButtonSelector = displaySelector.find("#show-hide");
        contentSelector = displaySelector.find("#content");

        contentSelector.hide();

        showHideButtonSelector.on('click', showContent);
    }

    function destroy() {

        displaySelector.remove();
        displaySelector = undefined;
        showHideButtonSelector.off('click');
    }

    /*function render(context) {

        var html = template(context);
        displaySelector.html(html);
    }*/

    function renderSingle(context) {

        var html = singleValueTemplate(context);
        contentSelector.html(html);
    }

    function renderByStation(context) {

        var html = valueByStationTemplate(context);
        contentSelector.html(html);
    }

    function avgChangeMeasurementEvent(measurement) {

        var context = {
            date : formatDate(new Date(measurement.date)),
            pmValue : measurement.pmValue
        };

        renderSingle(context);
    }

    function stationChangeMeasurementEvent(measurement) {

        var context = {
            date : formatDate(new Date(measurement.date)),
            stationValueList : _linq.select(measurement.values, function (x) {
                return {
                    stationName : x.stanicaId,
                    pmValue : x.pmValue
                };
            })
        };

        renderByStation(context);
    }

    function heatmapChangeMeasurementEvent(measurement) {

        var context = {
            date : formatDate(new Date(measurement.date)),
            stationValueList : _linq.select(measurement.values, function (x) {
                return {
                    stationName : x.stanicaId,
                    pmValue : x.pmValue
                };
            })
        };

        renderByStation(context);
    }


    function showContent() {

        showHideButtonSelector.html("затвори");
        contentSelector.slideDown();

        showHideButtonSelector.off('click');
        showHideButtonSelector.on('click', hideContent);
    }

    function hideContent() {

        showHideButtonSelector.html("прикажи");
        contentSelector.slideUp();

        showHideButtonSelector.off('click');
        showHideButtonSelector.on('click', showContent);
    }

    function formatDate(date) {
        //return date.format("dd.mm.yyyy HH:MM");
        return date.format("dd mmmm yyyy HH:MM");
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
