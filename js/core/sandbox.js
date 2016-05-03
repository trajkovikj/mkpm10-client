"use strict";

finkipm.sandbox = (function () {

    var _core = finkipm.core;
    var _mediator = finkipm.core.extensions.mediator;
    // var _ajax = finkipm.core.ajax; -> core extension

    return {

        notify : function (notification) {
            _mediator.notify(notification);
        },

        addListener : function (eventId, handler, context) {
            _mediator.addListener(eventId, handler, context)
        },
        
        removeListener : function (eventId, handler) {
            _mediator.removeListener(eventId, handler);
        }

        /*
            extension example (facade pattern)

            ajax : function (request) {
                _ajax.send(request);
            }
        */

    };

})();
