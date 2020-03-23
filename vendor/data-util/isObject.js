export default function (obj) {
	return obj && typeof obj === 'object' && !obj.length;
}