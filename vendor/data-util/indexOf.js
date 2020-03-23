import each from './each.js'
import isFunction from './isFunction.js'

export default function (agg, target) {
	var res = -1;

	if (agg !== 'undefined' && target !== 'undefined') {
		if (isFunction(target)) each(agg, function (val, index) {
			res = index;
			if (target(val, index)) return false;
		});
		else res = agg.indexOf(target);
	}

	return res;
}