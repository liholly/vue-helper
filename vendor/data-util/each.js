import isArray from './isArray.js'
import isFunction from './isFunction.js'
import isObject from './isObject.js'

export default function (agg, fn) {
	var _fn = true;
	if (!agg || !isFunction(fn)) return;

	if (isArray(agg)) {
		for (var i = 0; i < agg.length; i++) {
			_fn = fn(agg[i], i);
			if (_fn !== undefined && _fn === false) break;
		}
	}

	if (isObject(agg)) {
		var index = 0;
		for (var k in agg) {
			_fn = fn(agg[k], k, index++);
			if (_fn !== undefined && _fn === false) break;
		}
	}
}