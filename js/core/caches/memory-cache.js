/**
 * Created by srbo on 05-Jul-16.
 */

finkipm.core.extensions.cache.registerCache('memory', (function () {

    'use strict';

    var _cache = {};

    return {
      
        put: put,
        get: get
    };

    function put(key, value) {
        _cache[key] = value;
    }

    function get(key) {
        return _cache[key];
    }

})());