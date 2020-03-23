import isString from './isString.js'

export default function (str, s) {
	if (!str || !isString(str)) return [];
	return str.split(s)
}