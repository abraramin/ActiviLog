import { login as UserLogin, set_token, fetchUserData } from '../../api';

export default {

	id: null,
	fullName: null,
	email: null,
	organisationId: null,
	userType: null,
	loggedIn: false,
	token: null,

	loadUser() {
		// User Profile is no longer ready when loading
		this.ready == false;

		// Get WebToken from Browser
		this.getToken();

		// Set endpoints to use token
		set_token(this.token);

		if (this.token == null) {
			return false;
		}

		// Download User data
		let self = this;
		const load = fetchUserData().then(function(response) {
			if (response.status != 401) {
				return response.json()
			}
			return null;
		}).then(function(result) {
			if (result && result.success == true) {
				// Update User Profile Object
				self.id = result.user.id;
				self.fullName = result.user.fullName;
				self.email = result.user.email;
				self.organisationId = result.user.organisationId;
				self.userType = result.user.userType;
				self.loggedIn = true;

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
		this.id = null;
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
		if (this.token != null && JSON.parse(localStorage.getItem("token")) != this.token) {
			this.clearToken();
			this.saveToken(this.token);
		}
		this.token = JSON.parse(localStorage.getItem("token"));
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