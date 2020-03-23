import each from './each.js'
import split from './split.js'
import indexOf from './indexOf.js'

export default function (str) {
	var strIn;
	each(['-', '_', '~', '@', '+'], function (spt) {
		if (indexOf(str, spt) > -1) {
			strIn = split(str, spt);
			return false
		}
	});

	var strOut = '';
	each(strIn, function (val, index) {
		strOut += (index !== 0 ? val.replace(val[0], val[0].toUpperCase()) : val)
	});

	return strOut
}