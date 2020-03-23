import each from './each.js'
import includes from './includes.js'

export default function (arr) {
	var __arr = [];

	each(arr, function (val) {
		if (!includes(__arr, val)) __arr.push(val);
	});

	return __arr;
}