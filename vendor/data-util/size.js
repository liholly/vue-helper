import isObject from './isObject.js'
import keys from './keys.js'

export default function (agg) {
	return agg ? (isObject(agg) ? keys(agg).length : agg.length) : 0;
}