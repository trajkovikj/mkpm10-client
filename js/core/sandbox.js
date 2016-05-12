"use strict";

finkipm.sandbox = (function () {

    var _utils = finkipm.utils;
    var _linq = finkipm.utils.linq;

    var _core = finkipm.core;
    var _mediator = finkipm.core.extensions.mediator;
    var _templateHandler = finkipm.core.extensions.templateHandler;
    var _iterator = finkipm.core.extensions.iterator;

    // var _ajax = finkipm.core.ajax; -> core extension

    return {

        utils : _utils,
        linq : _linq,

        notify : function (notification) {

            _mediator.notify(notification);
        },

        addListener : function (eventId, handler, context) {

            _mediator.addListener(eventId, handler, context)
        },
        
        removeListener : function (eventId, handler) {

            _mediator.removeListener(eventId, handler);
        },

        getModel : function(modelId) {

            return _core.getModel(modelId);
        },

        getRepository : function(repositoryId) {

            return _core.getRepository(repositoryId);
        },

        getModule : function(modulId) {

            return _core.getModule(modulId);
        },

        getTemplate : function(templateName, callback) {

            _templateHandler.getTemplate(templateName, callback);
        },

        getTemplatePromise : function(templateName) {

            return _templateHandler.getTemplatePromise(templateName);
        },

        getIterator : function() {

            return _utils.object(_iterator);
        }

        /*
            extension example (facade pattern)

            ajax : function (request) {
                _ajax.send(request);
            }
        */

    };

})();
