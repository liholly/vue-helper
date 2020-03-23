import each from './each.js'

export default function (obj, arr, reject) {
	var o = {};

	if (reject) each(obj, function (val, key) {
		if (arr.indexOf(key) < 0) o[key] = val;
	});
	else each(arr, function (val) {
		o[val] = obj[val];
	});

	return o;
}