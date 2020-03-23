import keys from './keys.js'
import filter from './filter.js'

export default function (obj, target) {
	return keys(filter(obj, target));
}