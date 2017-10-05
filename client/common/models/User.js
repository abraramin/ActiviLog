import { login as UserLogin, set_token } from '../../api';

export default {

	profile: {
		loggedIn: false,
		name: "",
		token: "",
	},

	loadUser() {
		// Get the Web Token
		// Check if user is logged in
		// Download User data
		// populate profile object
		// Return value for redirect

		return true;
	},

	saveToken(token) {
		this.profile.token = token;
		// Save Web Token on Login
	},

	getToken() {

	},

	isLoggedIn() {

	},

	login(email, password, organizationName) {
		let self = this;
		return UserLogin(email, password, organizationName).then(response => response.json()).then(function(result) {
			// Return fail message if login not successful
			if (result.success == false) {
				return {
					success: false,
					message: "User information could not be loaded"
				}
			}
			
			// Save the token in internal browser storage
			self.saveToken(result.token);

			// Fetch User Data
			const ready = self.loadUser();
			if (ready == true) {
				return {
					success: true,
				}
			} else {
				return {
					// Return message if user data could not be fetched
					success: false,
					message: "User information could not be loaded"
				}
			}
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