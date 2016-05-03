"use strict";

finkipm.core.registerModule('displayModule', function (sandbox) {

    var _templateHandler = finkipm.core.extensions.templateHandler;

    // cache dom elements
    var bodySelector = $("body");
    var displaySelector;

    var templateSource;
    var template;

    _templateHandler.getTemplate('display-template', function(data){
        templateSource = data;
        template = Handlebars.compile(templateSource);
    });


    function initDOM() {

        var context = {
            date : '',
            pmValue : ''
        };

        var html = template(context);

        bodySelector.append('<div id="display"></div>');
        displaySelector = $("#display");
        displaySelector.html(html);
    }

    function destroyDOM() {
        displaySelector.remove();
        displaySelector = undefined;
    }

    function render(context) {

        var html = template(context);
        displaySelector.html(html);
    }

    function sliderChangePositionEvent(sliderData) {
        var context = formatSliderData(sliderData);
        render(context);
    }

    function formatSliderData(sliderData) {
        return {
            date : sliderData.date.format("dd.mm.yyyy"),
            pmValue : sliderData.pmValue
        };
    }

    return {

        initListeners : function () {
            sandbox.addListener('slider-change-position', sliderChangePositionEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('slider-change-position', sliderChangePositionEvent);
        },

        start : function () {
            initDOM();
            this.initListeners();
        },

        destroy : function () {
            destroyDOM();
            this.removeListeners();
        }
    };
});

