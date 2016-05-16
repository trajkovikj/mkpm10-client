"use strict";

finkipm.core.registerModule('sidebarModule', function (sandbox) {

    var _toastModule = sandbox.getModule('toastModule');

    var _linq = sandbox.linq;
    var _cityRepository = sandbox.getRepository('cityRepository');
    var _dateRepository = sandbox.getRepository('dateRepository');
    var _measurementsRepository = sandbox.getRepository('measurementsRepository');

    // cache dom elements
    var body = $("body");
    var templateSource;
    var template;
    var templateMonthSelectorSource;
    var monthTemplate;


    /*sandbox.getTemplate('sidebar-template', function(data){
        templateSource = data;
        template = Handlebars.compile(templateSource);
    });

    sandbox.getTemplate('sidebar-month-template', function(data){
        templateMonthSelectorSource = data;
        monthTemplate = Handlebars.compile(templateSource);
    });*/


    var sidebarSelector;
    var openCloseSliderButton;
    var mapTypeSelector;
    var citySelector;
    var yearSelector;
    var monthSelector;
    var submitButton;

    var allYearsWithMonths;


    function formatMonthsArray(months) {
        months.unshift('Сите месеци');
        return months;
    }

    function getMapTypes(){

        var mapTypeList = [];

        for(var key in enums.mapType){
            if (enums.mapType.hasOwnProperty(key)) {
                mapTypeList.push({
                    value : enums.mapType[key].value,
                    description : enums.mapType[key].description,
                    checked : ''
                });
            }
        }

        mapTypeList[0].checked = 'checked';
        return mapTypeList;
    }

    function getYears(years){

        var result = [];

        for(var i=0; i < years.length; i++) {
            result.push({
                id : i,
                value : years[i],
                content : years[i]
            });
        }

        return result;
    }

    function getMonths(months){

        months = formatMonthsArray(months);
        var result = [];

        for(var i=0; i < months.length; i++) {
            result.push({
                id : i,
                value : i,
                content : months[i]
            });
        }

        return result;
    }


    function initTemplates(callback) {

        sandbox.getTemplatePromise('sidebar-template').then(function(data) {
            templateSource = data;
            template = Handlebars.compile(templateSource);

            return sandbox.getTemplatePromise('sidebar-month-template');
        }).then(function(data) {
            templateMonthSelectorSource = data;
            monthTemplate = Handlebars.compile(templateSource);

            callback();
        });
    }

    function init(callback) {

        var allYearsWithMonthsPromise = _dateRepository.getAllYearsWithMonths();
        var citiesPromise = _cityRepository.getAll();

        allYearsWithMonthsPromise.then(function (data) {

            allYearsWithMonths = data;
            return citiesPromise;

        }).then(function (citiesData) {

            var cities = _linq.select(citiesData, function(c){
                return {
                    id : c.id,
                    value : c.id,
                    content : c.name
                }
            });

            var context = {
                mapTypes : getMapTypes(),
                cities : cities,
                years : getYears(_linq.select(allYearsWithMonths, function(x){
                    return x.year;
                })),
                months : getMonths(allYearsWithMonths[0].months)
            };

            var html = template(context);
            body.prepend(html);

            sidebarSelector = $("#sidebar");
            openCloseSliderButton = sidebarSelector.find("#open-close");
            mapTypeSelector = sidebarSelector.find("#radio-map-type");
            citySelector = sidebarSelector.find("#city");
            yearSelector = sidebarSelector.find("#year");
            monthSelector = sidebarSelector.find("#month");
            submitButton = sidebarSelector.find("#submit");

            openCloseSliderButton.button({
                icons : {
                    primary : 'ui-icon-triangle-1-w'
                },
                text : false
            });

            callback();
        });


        /*allYearsWithMonthsPromise.fail(function(jqXHR, textStatus, errorThrown){
            // _toastModule.createToast(textStatus, 1000);
        });

        citiesPromise.fail(function(jqXHR, textStatus, errorThrown){
            // _toastModule.createToast(textStatus, 1000);
        });*/
    }

    function destroy(callback) {

        sidebarSelector.remove();
        callback();
    }

    function render() {

    }

    function renderMonthSelector(selectedYearId){
        var context = {
            months : getMonths(allYearsWithMonths[selectedYearId].months)
        };

        var html = monthTemplate(context);
        monthSelector.html('');
        monthSelector.html(html);
    }


    function getRequestedData(request, callback) {

        switch (request.mapType) {

            case enums.mapType.SREDNA_VREDNOST.value :

                callback(data);
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
        }
    }


    function openSidebarEvent() {
        sidebarSelector.animate({ "left": "+=15%" }, "slow" );

        openCloseSliderButton.button({
            icons : {
                primary : 'ui-icon-triangle-1-w'
            },
            text : false
        });

        openCloseSliderButton.off("click");
        openCloseSliderButton.on("click", closeSidebarEvent);
    }

    function closeSidebarEvent() {
        sidebarSelector.animate({ "left": "-=15%" }, "slow" );

        openCloseSliderButton.button({
            icons : {
                primary : 'ui-icon-triangle-1-e'
            },
            text : false
        });

        openCloseSliderButton.off("click");
        openCloseSliderButton.on("click", openSidebarEvent);
    }

    function yearChangeEvent() {
        var selectedYearId = yearSelector.find(" :selected").attr("id");
        renderMonthSelector(selectedYearId);
    }


    function submitRequestEvent() {

        var request = {
            mapType : parseInt(mapTypeSelector.find("input[name=map-type]:checked").val()),
            cityId : parseInt(citySelector.val()),
            year : yearSelector.val(),
            month : monthSelector.val()
        };

        // ova e test
        // request.getAllAvg treba da se zameni so nekoe repository ili model
        // koj sto ke go primi requestot i preku ajax ke vrati rezultati od serverot
        // na callback ke ja konstruira notifikacijata i ke ja publish-ne na medijatorot

        _measurementsRepository.getFiltered(request).then(function(data) {

            var notification = {
                request : request,
                response : data
            };

            debugger;

            sandbox.notify({
                eventId : 'sidebarModule::submit-request',
                data : notification
            });
        });

        /*requests.getAllAvg(request.year, request.month).done(function (data) {

            var notification = {
                request : request,
                response : data
            };

            sandbox.notify({
                eventId : 'sidebarModule::submit-request',
                data : notification
            });
        });*/
    }

    return {

        submitRequest : submitRequestEvent,

        start : function () {

            initTemplates(function() {

                init(function () {

                    openCloseSliderButton.on("click", closeSidebarEvent);
                    yearSelector.on('change', yearChangeEvent);
                    submitButton.on('click', submitRequestEvent);
                });
            });
        },

        destroy : function () {

            destroy(function () {

                openCloseSliderButton.off("click");
                yearSelector.off('change');
                submitButton.off('click');
            });
        }

    };
});

