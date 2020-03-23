import each from './each.js'

export default function (arr) {
	var __arr = [];

	each(arr, function (val) {
		if (!!val) __arr.push(val);
	});

	return __arr;
}