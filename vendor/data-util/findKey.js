import isObject from './isObject.js'
import filter from './filter.js'
import keys from './keys.js'

export default function (agg, target) {
	return isObject(agg) ? keys(filter(agg, target, 1))[0] : null
}