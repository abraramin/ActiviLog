export default function (val) {
	if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val) && val != "") {
		return true;
	} else {
		return false;
	}
}