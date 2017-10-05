import { login as UserLogin, set_token, fetchUserData } from '../../api';

export default {

	profile: {
		id: null,
		fullName: null,
		email: null,
		organisationId: null,
		userType: null,
		loggedIn: false,
		token: null,
	},

	loadUser() {
		// Get WebToken from Browser
		this.getToken();

		// Set endpoints to use token
		set_token(this.profile.token);

		if (this.profile.token == null) {
			return false;
		}

		// Download User data
		let self = this;
		const load = fetchUserData().then(response => response.json()).then(function(result) {
			if (result.success == true) {
				// Update User Profile Object
				self.profile.id = result.user.id;
				self.profile.fullName = result.user.fullName;
				self.profile.email = result.user.email;
				self.profile.organisationId = result.user.organisationId;
				self.profile.userType = result.user.userType;
				self.profile.loggedIn = true;

				// Return success
				return true;
			} else {
				return false;
			}
		});

		if (load == false) {
			this.clearToken();
			this.clearProfile();
			return false;
		}

		return true;
	},

	clearProfile() {
		this.profile.id = null;
		this.fullName = null;
		this.email = null;
		this.organisationId = null;
		this.userType = null;
		this.loggedIn = false;
		this.token = null;
	},

	saveToken(token) {
		localStorage.setItem("token", JSON.stringify(token));
		if (JSON.parse(localStorage.getItem("token")) == token) {
			return true;
		} else {
			return false;
		}
	},

	getToken() {
		if (this.profile.token != null && JSON.parse(localStorage.getItem("token")) != this.profile.token) {
			this.clearToken();
			this.saveToken(this.profile.token);
		}
		this.profile.token = JSON.parse(localStorage.getItem("token"));
	},

	clearToken() {
		if (JSON.parse(localStorage.getItem("token")) !== null) {
			localStorage.removeItem("token");
		}
		if (JSON.parse(localStorage.getItem("token")) !== null) {
			return false;
		} else {
			return true;
		}
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
			const tokenSaved = self.saveToken(result.token);
			if (tokenSaved == false) {
				return {
					success: false,
					message: "Token could not be saved"
				}
			}
			// Fetch User Data
			const userLoaded = self.loadUser();
			if (userLoaded == true) {
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
	
	hasRole() {

	},

	forgotPassword() {

	}
};