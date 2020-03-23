export default function (time, fn, step) {
	var _step = typeof step !== 'undefined' ? step : 1000;
	var c = setInterval(function () {
		if (time < _step) clearInterval(c);
		else (time -= _step, fn(time, c));
	}, _step);
	
	return c;
}