export default function keys(obj) {
	return typeof obj === 'object' ? Object.keys(obj) : [];
}