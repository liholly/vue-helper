import each from './../vendor/data-util/each.js'
import get from './../vendor/data-util/get.js'
import isArray from './../vendor/data-util/isArray.js'
import isObject from './../vendor/data-util/isObject.js'
import pick from './../vendor/data-util/pick.js'
import size from './../vendor/data-util/size.js'
import isFunction from './../vendor/data-util/isFunction.js'

export default function (Vue) {
	function _VueHelper(M, S) {
		var serviceDeps = {};
		var modelKeys = [];
		var watchers = {};
		var VHRoot = this,
			BUS = new Vue();

		function keyInModels(key) {
			return modelKeys.indexOf(key) > -1
		}

		function setModels(models) {
			each(models, function (model, key) {
				M[key] = model;
				modelKeys.push(key);
			})
		}

		function setServiceToDepends() {
			each(S, function (service, name) {
				if (!keyInModels(name)) {
					each(service.$options.services, function (depName, index) {
						if (S[depName]) serviceDeps[name][index].__proto__ = S[depName];
					});
					VHRoot.debug && console.log(name, serviceDeps);
				}
			})
		}

		function handleListens(VM) {
			var listen = VM.$options.listen;

			if (isObject(listen)) {
				each(listen, function (listenName, fn) {
					BUS.$on(listenName, function () {
						fn.apply(VM, arguments);
					});
				})
			}

			else if (isArray(listen)) {
				each(listen, function (listenName) {
					BUS.$on(listenName, function () {
						VM[listenName].apply(VM, arguments);
					});
				})
			}
		}

		function handleWatchers() {
			each(watchers, function (watcher, name) {
				var service = S[name];
				each(watcher, function (handler, exp) {
					if (isObject(handler)) {
						service.$watch(exp, handler.handler, {deep: handler.deep});
					}

					if (isFunction(handler)) {
						service.$watch(exp, handler);
					}
				});
			});
		}

		function loadService(name, opts) {
			//watch会被暂时提取出来，避免在创建模块过程中被触发
			S[name] = new Vue(pick(opts, ['watch'], true));
			watchers[name] = get(opts, 'watch');

			var index = size(get(S[name], '$options.services')) + 1;
			serviceDeps[name][index].__proto__ = S[name];

			setServiceToDepends();
		}

		this.install = function (Vue) {
			var opts = {
				//Load models
				data: function () {
					return get(this.$options, 'mixinModels') ? {models: M} : {};
				},
				//Load services
				beforeCreate: function () {
					var self = this;
					each(S, function (service, name) {
						if (!keyInModels(name)) self[name] = service;
					})
				},
				//Load listen
				created: function () {
					handleListens(this)
				}
			};

			Vue.mixin(opts);
		};

		this.debug = false;
		this.loaded = false;
		this.mounted = false;
		this.stop = false;

		this.models = M;
		this.services = S;

		this.service = function (name, deps, options) {
			var __options;
			if (!options) {
				__options = deps;
				serviceDeps[name] = [M, {}];
			}
			else {
				__options = options;
				var deps1 = deps.map(function () {
					return {}
				});
				deps1.push(M, {});
				serviceDeps[name] = deps1;
			}

			//inject deps instance
			__options = __options.apply(this, serviceDeps[name]);
			__options.mixinModels = true;

			//if it has deps Array that hang in the service options
			if (options) __options.services = deps;

			loadService(name, __options);
		};
		this.setModels = setModels;
		this.replace = function (modelName, target) {
			M[modelName] = target;
		};
		this.rep = this.replace;
		this.relation = function (modelName, targetModelName, targetPath) {
			M[modelName] = get(M, targetModelName + '.' + targetPath);
		};
		this.rel = this.relation;
		this.call = BUS.$emit.bind(BUS);
		this.listen = BUS.$on.bind(BUS);
		this.BUS = BUS;
		BUS.call = BUS.$emit.bind(BUS);
		this.rootView = null;

		this.app = function (name, opts) {
			handleWatchers();
			this.loaded = true;
			if (this.stop) return false;

			this[name] = this.rootView = new Vue(opts);

			//If APP container has setted
			if (get('el', opts)) {
				VHRoot.mounted = true;
			}

			return {
				$mount: function (containerID) {
					VHRoot[name].$mount(containerID);
					VHRoot.mounted = true;
				}
			};
		};
	}

	var __models = {};
	var __Service__ = new Function;
	__Service__.prototype = __models;

	var __services = new __Service__;
	_VueHelper.prototype = __services;

	var __VueHelper = new _VueHelper(__models, __services);

	Vue.use(__VueHelper);
	return __VueHelper
}