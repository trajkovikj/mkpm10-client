"use strict";

finkipm.core.registerModule('sidebarModule', function (sandbox) {

    var _toastModule = sandbox.getModule('toastModule');

    var _utils = sandbox.utils;
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
    var templateTimeUnitSelectorSource;
    var timeUnitTemplate;


    /*sandbox.getTemplate('sidebar-template', function(data){
        templateSource = data;
        template = Handlebars.compile(templateSource);
    });

    sandbox.getTemplate('sidebar-month-template', function(data){
        templateMonthSelectorSource = data;
        monthTemplate = Handlebars.compile(templateSource);
    });*/


    var sidebarSelector;
    var openSidebarButton;
    var closeSidebarButton;
    var mapTypeSelector;
    var citySelector;
    var yearSelector;
    var monthSelector;
    var submitButton;

    var allYearsWithMonths;
    var defaultYear = {
        id : 0,
        value : 0,
        content : 'Сите години'
    };
    var defaultMonth = {
        id : 0,
        value : 0,
        content : 'Сите месеци'
    };


    function formatMonthsArray(months) {
        months.unshift(defaultMonth.content);
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

    function getTimeUnits(){

        var timeUnitList = [];

        for(var key in enums.timeUnit){
            if (enums.timeUnit.hasOwnProperty(key)) {
                timeUnitList.push({
                    value : enums.timeUnit[key].value,
                    description : enums.timeUnit[key].description,
                    checked : ''
                });
            }
        }

        timeUnitList[0].checked = 'checked';
        return timeUnitList;
    }

    function initTemplates(callback) {

        sandbox.getTemplatePromise('sidebar-template').then(function(data) {

            templateSource = data;
            template = Handlebars.compile(templateSource);
            return sandbox.getTemplatePromise('sidebar-month-template');

        }).then(function(data) {

            templateMonthSelectorSource = data;
            monthTemplate = Handlebars.compile(templateSource);
            return sandbox.getTemplatePromise('sidebar-time-unit-template');

        }).then(function(data) {

            templateTimeUnitSelectorSource = data;
            timeUnitTemplate = Handlebars.compile(templateTimeUnitSelectorSource);
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
            openSidebarButton = $("#open-sidebar");
            closeSidebarButton = sidebarSelector.find("#close-sidebar");
            mapTypeSelector = sidebarSelector.find("#radio-map-type");
            citySelector = sidebarSelector.find("#city");
            yearSelector = sidebarSelector.find("#year");
            monthSelector = sidebarSelector.find("#month");
            submitButton = sidebarSelector.find("#submit");

            /*openSidebarButton.button({
                icons : {
                    primary : 'ui-icon-triangle-1-e'
                },
                text : false
            });

            closeSidebarButton.button({
                icons : {
                    primary : 'ui-icon-triangle-1-w'
                },
                text : false
            });*/

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

        var timeUnitSelector = $("#sidebar").find("#radio-time-unit");
        if(_utils.jqSelectorExist(timeUnitSelector)) timeUnitSelector.remove();

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
        sidebarSelector.animate({ "left": "+=20%" }, "slow" );
    }

    function closeSidebarEvent() {
        sidebarSelector.animate({ "left": "-=20%" }, "slow" );
    }

    function yearChangeEvent() {
        var selectedYearId = yearSelector.find(" :selected").attr("id");
        renderMonthSelector(selectedYearId);
    }

    function monthChangeEvent() {
        var selectedYear = parseInt(yearSelector.find(" :selected").val());
        var selectedMonth = parseInt(monthSelector.find(" :selected").val());

        var timeUnitSelector = $("#sidebar").find("#radio-time-unit");

        if(selectedYear !== defaultYear.value && selectedMonth !== defaultMonth.value) {

            if(!_utils.jqSelectorExist(timeUnitSelector)) {

                var context = {
                    timeUnits : getTimeUnits()
                };

                var html = timeUnitTemplate(context);
                monthSelector.after(html);
            }
        } else {

            if(_utils.jqSelectorExist(timeUnitSelector)) timeUnitSelector.remove();
        }

    }


    function submitRequestEvent() {

        var timeUnitSelector = $("#sidebar").find("#radio-time-unit");

        var request = {
            mapType : parseInt(mapTypeSelector.find("input[name=map-type]:checked").val()),
            cityId : citySelector.val(),
            year : parseInt(yearSelector.val()),
            month : parseInt(monthSelector.val()),
            timeUnit : _utils.jqSelectorExist(timeUnitSelector) ? parseInt(timeUnitSelector.find("input[name=time-unit]:checked").val()) : undefined
        };

        _measurementsRepository.getFiltered(request).then(function(data) {

            var notification = {
                request : request,
                response : data
            };

            sandbox.notify({
                eventId : 'sidebarModule::submit-request',
                data : notification
            });
        });

    }

    return {

        submitRequest : submitRequestEvent,

        start : function () {

            initTemplates(function() {

                init(function () {

                    openSidebarButton.on("click", openSidebarEvent);
                    closeSidebarButton.on("click", closeSidebarEvent);
                    yearSelector.on('change', yearChangeEvent);
                    monthSelector.on('change', monthChangeEvent);
                    submitButton.on('click', submitRequestEvent);
                });
            });
        },

        destroy : function () {

            destroy(function () {

                openSidebarButton.off("click");
                closeSidebarButton.off("click");
                yearSelector.off('change');
                monthSelector.off('change');
                submitButton.off('click');
            });
        }

    };
});

