"use strict";

finkipm.core.registerModule('sidebarModule', function (sandbox) {

    var _utils = finkipm.utils;
    var _linq = finkipm.utils.linq;
    var _cityModel = _utils.object(finkipm.core.getModel('cityModel'));
    var _dateRepository = _utils.object(finkipm.core.getRepository('dateRepository'));

    // cache dom elements
    var body = $("body");
    var templateSelector = $("#sidebar-template");
    var templateSource = templateSelector.html();
    var template = Handlebars.compile(templateSource);
    var templateMonthSelector = $("#sidebar-month-template");
    var templateMonthSelectorSource = templateMonthSelector.html();
    var monthTemplate = Handlebars.compile(templateMonthSelectorSource);

    var sidebarSelector;
    var openCloseSliderButton;
    var mapTypeSelector;
    var citySelector;
    var yearSelector;
    var monthSelector;
    var submitButton;

    var allYearsWithMonths;

    /*

    function init() {
        initMapTypes();
        initSelectors();
    }

    function initMapTypes() {

        selectors.logo.after(function () {
            var inputElements = '';

            for(var key in enums.mapType){
                if (enums.mapType.hasOwnProperty(key)) {
                    inputElements += '<input type="radio" name="map-type" value="'+ enums.mapType[key].value +'"> ' + enums.mapType[key].description +'<br>';
                }
            }

            return '<div id="radio-map-type">' + inputElements + '</div>';

        });

        selectors.mapTypeRadio = $("#radio-map-type");
        selectors.mapTypeRadio.find("input:radio").first().prop("checked", true);
    }

    function initSelectors() {
        var allYears;

        requests.getAllMonthsByYears().done(function (data) {
            allYears = data;
        });

        initCitySelector(utils.select(models.city.getAll(), function (c) {
            return { id : c.id, name : c.name };
        }));


        initYearsSelector(utils.select(allYears, function (x) {
            return x.year;
        }));

        initMonthsSelector(formatMonthsArray(allYears[0].months));

        selectors.yearSelector.change(function () {
            var selectedYearId = selectors.yearSelector.find(" :selected").attr("id");
            initMonthsSelector(formatMonthsArray(allYears[selectedYearId].months));
        });

    }

    function initCitySelector (citiesArray) {
        var i;

        selectors.citySelector.html('');

        for(i = 0; i < citiesArray.length; i++) {
            selectors.citySelector.append('<option id="'+ citiesArray[i].id +'" value="'+ citiesArray[i].id +'">'+ citiesArray[i].name +'</option>');
        }
    }

    function initYearsSelector (yearsArray) {
        var i;

        selectors.yearSelector.html('');

        for(i = 0; i < yearsArray.length; i++) {
            selectors.yearSelector.append('<option id="'+ i +'" value="'+ yearsArray[i] +'">'+ yearsArray[i] +'</option>');
        }
    }

    function initMonthsSelector (monthsArray) {
        var i;

        selectors.monthSelector.html('');

        for(i = 0; i < monthsArray.length; i++) {
            selectors.monthSelector.append('<option id="'+ i +'" value="'+ i +'">'+ monthsArray[i] +'</option>');
        }
    }

    */


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
        openCloseSliderButton.html("&lt");
        openCloseSliderButton.off("click");
        openCloseSliderButton.on("click", closeSidebarEvent);
    }

    function closeSidebarEvent() {
        sidebarSelector.animate({ "left": "-=15%" }, "slow" );
        openCloseSliderButton.html("&gt");
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

            sandbox.notify({
                eventId : 'sidebar-submit-request',
                data : request
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

