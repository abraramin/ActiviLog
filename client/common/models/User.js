import { login as UserLogin, set_token } from '../../api';

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

	login(username, password, organizationName) {
		UserLogin(username, password, organizationName).then(function(result) {
			console.log("here is the result with the token");
			console.log(result);

			// Save the web token
			// Fetch User Data
		});
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