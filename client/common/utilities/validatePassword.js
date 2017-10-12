export default function (val) {
	if (/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(val) && val != "") {
		return true;
	} else {
		return false;
	}
}