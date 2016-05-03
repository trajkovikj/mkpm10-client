"use strict";

// enums.js
// core.js
// mediator.js
// utils.js
// sandbox.js
// repositories/*.js
// models/*.js
// modules/*.js

// main.js
// init.js

// ???
// iterator.js
// broker.js
// painter.js
// shared-objects.js
// map-setup.js
// requests.js
// marker-test.js

var finkipm = {
    core : {},
    sandbox : {},
    utils : {}
};

finkipm.core = (function () {

    var _modules = {};
    var _repositories = {};
    var _models = {};

    return {

        registerModule : function (moduleId, callback) {
            _modules[moduleId] = callback(finkipm.sandbox);
        },

        unregisterModule : function (moduleId) {
            delete _modules[moduleId];
        },

        getModule : function (moduleId) {
            return _modules[moduleId];
        },

        startModule : function (moduleId) {
            var module = _modules[moduleId];
            if(!module) return;

            module.start();
        },

        destroyModule : function (moduleId) {
            var module = _modules[moduleId];
            if(!module) return;

            module.destroy();
        },

        startAllModules : function () {
            for(var key in _modules){
                if(_modules.hasOwnProperty(key)){
                    _modules[key].start();
                }
            }
        },

        destroyAllModules : function () {
            for(var key in _modules){
                if(_modules.hasOwnProperty(key)){
                    _modules[key].destroy();
                }
            }
        },

        registerRepository : function (repositoryId, repository) {
            if(typeof repositoryId !== 'string' && typeof repository !== 'object') return false;
            _repositories[repositoryId] = repository;
            return true;
        },

        unregisterRepository : function (repositoryId) {
            if(typeof repositoryId !== 'string' && !_repositories[repositoryId]) return false;
            _repositories[repositoryId] = undefined;
            return true;
        },

        getRepository : function (repositoryId) {
            return _repositories[repositoryId];
        },

        registerModel : function (modelId, model) {
            if(typeof modelId !== 'string' && typeof model !== 'object') return false;
            _models[modelId] = model;
            return true;
        },

        unregisterModel : function (modelId) {
            if(typeof modelId !== 'string' && !_models[modelId]) return false;
            _models[modelId] = undefined;
            return true;
        },

        getModel : function (modelId) {
            return _models[modelId];
        },

        extensions : {
            mediator : {},
            templateHandler : {}
        }
    };

})();

