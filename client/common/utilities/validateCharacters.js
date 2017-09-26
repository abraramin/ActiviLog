export default function (val) {
	if (/^[a-zA-Z()]+$/.test(val) || val == "") {
		return true;
	} else {
		return false;
	}
}