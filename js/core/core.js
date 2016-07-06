"use strict";

var finkipm = {
    core: {},
    sandbox: {},
    utils: {}
};

finkipm.core = (function () {

    var _modules = {};
    var _repositories = {};
    var _models = {};

    return {

        registerModule: registerModule,
        unregisterModule: unregisterModule,
        getModule: getModule,
        startModule: startModule,
        destroyModule: destroyModule,
        startAllModules: startAllModules,
        destroyAllModules: destroyAllModules,
        registerRepository: registerRepository,
        unregisterRepository: unregisterRepository,
        getRepository: getRepository,
        registerModel: registerModel,
        unregisterModel: unregisterModel,
        getModel: getModel,

        extensions: {
            config: {},
            mediator: {},
            iterator: {},
            templateHandler: {},
            cache: {}
        }
    };


    function registerModule(moduleId, callback) {
        _modules[moduleId] = callback(finkipm.sandbox);
    }

    function unregisterModule(moduleId) {
        delete _modules[moduleId];
    }

    function getModule(moduleId) {
        return _modules[moduleId];
    }

    function startModule(moduleId) {
        var module = _modules[moduleId];
        if (!module) return;

        module.start();
    }

    function destroyModule(moduleId) {
        var module = _modules[moduleId];
        if (!module) return;

        module.destroy();
    }

    function startAllModules() {
        for (var key in _modules) {
            if (_modules.hasOwnProperty(key)) {
                _modules[key].start();
            }
        }
    }

    function destroyAllModules() {
        for (var key in _modules) {
            if (_modules.hasOwnProperty(key)) {
                _modules[key].destroy();
            }
        }
    }

    function registerRepository(repositoryId, repository) {
        if (typeof repositoryId !== 'string' && typeof repository !== 'object') return false;
        _repositories[repositoryId] = repository;
        return true;
    }

    function unregisterRepository(repositoryId) {
        if (typeof repositoryId !== 'string' && !_repositories[repositoryId]) return false;
        _repositories[repositoryId] = undefined;
        return true;
    }

    function getRepository(repositoryId) {
        return _repositories[repositoryId];
    }

    function registerModel(modelId, model) {
        if (typeof modelId !== 'string' && typeof model !== 'object') return false;
        _models[modelId] = model;
        return true;
    }

    function unregisterModel(modelId) {
        if (typeof modelId !== 'string' && !_models[modelId]) return false;
        _models[modelId] = undefined;
        return true;
    }

    function getModel(modelId) {
        return _models[modelId];
    }


})();

