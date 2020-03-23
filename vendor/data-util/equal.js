//注意务必传入可枚举的对象
import isObject from './isObject.js'
import isArray from './isArray.js'
import keys from './keys.js'
import size from './size.js'
import each from './each.js'

export default function (agg1, agg2) {
	var res = true;
	if (typeof agg1 !== typeof agg2) return false;
	if (isObject(agg1) || isArray(agg1)) {
		if (size(keys(agg1)) !== size(keys(agg2))) return false;
		else each(agg1, function (val, key) {
			if (val !== agg2[key]) {
				res = false;
				return false;
			}
		})
	}
	else res = (agg1 === agg2);

	return res
}