import { login as UserLogin } from '../../api';

export default {

	profile: {
		name: "",
		token: "",
	},

	load() {
		// Get the Web Token
		// Check if user is logged in
		// Download User data
		// populate profile object
	},

	saveToken() {
		// Save Web Token on Login
	},

	getToken() {

	},

	isLoggedIn() {

	},

	login(username, password) {
		UserLogin(username, password).then(function(result) {
			console.log("Successsful login");
		});
		this.user = "new value of user object";
		//alert("Account login");
	},

	logout() {

	},

	hasFeature() {

	},

	hasRole() {

	},

	forgotPassword() {

	}
};