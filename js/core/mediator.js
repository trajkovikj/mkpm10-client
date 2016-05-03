"use strict";

finkipm.core.extensions.mediator = (function () {

    var _events = {};

    return {

        notify : function (notification) {
            var listeners = _events[notification.eventId];
            if(!listeners) return;

            listeners.forEach(function (listener) {
                listener.handler.call(listener.context, notification.data);
            })
        },

        addListener : function (eventId, handler, context) {
            _events[eventId] = _events[eventId] || [];
            _events[eventId].push({ handler : handler, context : context });
        },

        removeListener : function (eventId, handler) {
            var listeners = _events[eventId];
            if(!listeners) return;

            for(var i=0; i < listeners.length; i++){
                if(listeners[i].handler === handler) {
                    listeners[i].splice(i, 1);
                    break;
                }
            }
        }

    };

})();