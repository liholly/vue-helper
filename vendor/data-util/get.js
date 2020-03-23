export default function (target, path) {
	if (!target || !path) return target;
	var _t = target,
		_p = String(path).split('.');

	for (var i = 0; i < _p.length; i++) {
		_t = _t[_p[i]];
		if (!_t) break;
	}

	return _t;
}