"use strict";

finkipm.core.extensions.templateHandler = (function () {


    return {

        getTemplate : function (path, callback) {
            $.ajax({
                url: './js/templates/' + path + '.handlebars',
                cache: true,
                success: function(data) {
                    callback(data);
                }
            });
        },

        getTemplatePromise : function (path) {
            return $.ajax({
                url: './js/templates/' + path + '.handlebars',
                cache: true
            });
        },

        renderTemplate : function (path, target, jsonData) {
            var source;
            var template;

            $.ajax({
                url:'./js/templates/' + path + '.handlebars',
                cache: true,
                success: function(data) {
                    source    = data;
                    template  = Handlebars.compile(source);
                    $(target).html(template(jsonData));
                }
            });
        }
    };

})();