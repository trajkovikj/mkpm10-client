"use strict";

finkipm.core.registerModule('sidebarModule', function (sandbox) {

    var _utils = finkipm.utils;
    var _linq = finkipm.utils.linq;
    var _templateHandler = finkipm.core.extensions.templateHandler;
    var _cityModel = _utils.object(finkipm.core.getModel('cityModel'));
    var _dateRepository = _utils.object(finkipm.core.getRepository('dateRepository'));

    // cache dom elements
    var body = $("body");
    var templateSource;
    var template;
    var templateMonthSelectorSource;
    var monthTemplate;

    _templateHandler.getTemplate('sidebar-template', function(data){
        templateSource = data;
        template = Handlebars.compile(templateSource);
    });

    _templateHandler.getTemplate('sidebar-month-template', function(data){
        templateMonthSelectorSource = data;
        monthTemplate = Handlebars.compile(templateSource);
    });

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

    function getCities(){

        // mozda ke treba da ide so callback zasto getAll pristapuva do ajax
        return _linq.select(_cityModel.getAll(), function(c){
            return {
                id : c.id,
                value : c.id,
                content : c.name
            }
        });
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


    function render() {

        _dateRepository.getAllYearsWithMonths().done(function(data) {

            allYearsWithMonths = data;

            var context = {
                mapTypes : getMapTypes(),
                cities : getCities(),
                years : getYears(_linq.select(data, function(x){
                    return x.year;
                })),
                months : getMonths(data[0].months)
            };

            var html = template(context);
            body.prepend(html);

            sidebarSelector = $("#sidebar")
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
        });
    }

    function renderMonthSelector(selectedYearId){
        var context = {
            months : getMonths(allYearsWithMonths[selectedYearId].months)
        };

        var html = monthTemplate(context);
        monthSelector.html('');
        monthSelector.html(html);
    }


    function openSidebarEvent() {
        sidebarSelector.animate({ "left": "+=15%" }, "slow" );

        // openCloseSliderButton.html("&lt");
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

        // openCloseSliderButton.html("&gt");
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


    return {

        submitRequest : function() {
            var request = {
                mapType : mapTypeSelector.find("input[name=map-type]:checked").val(),
                cityId : parseInt(citySelector.val()),
                year : yearSelector.val(),
                month : monthSelector.val()
            };

            // ova e test
            // request.getAllAvg treba da se zameni so nekoe repository ili model
            // koj sto ke go primi requestot i preku ajax ke vrati rezultati od serverot
            // na callback ke ja konstruira notifikacijata i ke ja publish-ne na medijatorot
            requests.getAllAvg(request.year, request.month).done(function (data) {

                var notification = {
                    request : request,
                    response : data
                };

                sandbox.notify({
                    eventId : 'sidebar-submit-request',
                    data : notification
                });
            });


        },

        start : function () {
            render();
            openCloseSliderButton.on("click", closeSidebarEvent);
            yearSelector.on('change', yearChangeEvent);
            submitButton.on('click', this.submitRequest)
        },

        destroy : function () {
            sidebarSelector.remove();
            openCloseSliderButton.off("click");
            yearSelector.off('change');
            submitButton.off('click');
        }

    };
});

