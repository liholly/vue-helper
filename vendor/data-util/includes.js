//区别于lodash 这个传入函数当作条件
import each from './each.js'
import isFunction from './isFunction.js'

export default function (arr, target) {
	var __has = false;

	each(arr, function (val) {
		if (isFunction(target) && target(val)) __has = true;
		else if (target === val) __has = true;

		if (__has) return false;
	});

	return __has;
}