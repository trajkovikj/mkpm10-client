/**
 * Created by srbo on 05-Jul-16.
 */

finkipm.core.extensions.cache = (function () {

    'use strict';

    var _defaultCacheType = 'memory';
    var _caches = {};

    return {
        put: put,
        get: get,

        registerCache: registerCache
    };

    function put(key, value, cacheType) {
        var workingCache = getCache(cacheType);
        workingCache.put(key, value);
    }

    function get(key, cacheType) {
        var workingCache = getCache(cacheType);
        return workingCache.get(key);
    }

    function registerCache(cacheType, cache) {
        _caches[cacheType] = cache;
    }

    function getCache(cacheType) {
        cacheType = cacheType || _defaultCacheType;
        return _caches[cacheType];
    }

})();