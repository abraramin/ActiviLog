import { login as UserLogin, set_token, fetchUserData } from '../../api';
import { saveToken, getToken, clearToken } from '../utilities/tokenStorage'

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
		this.token = getToken();

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
				this.token = null;
				clearToken();
				return false;
			}
		});

		if (load == false) {
			return false;
		}

		return true;
	},

	login(email, password, organizationName) {
		// Construct empty response message
		const response = {
			success: false,
			message: "",
		}

		// Return message if user data could not be fetched
		if (this.token != null) {
			response.success = true;
			response.message = "User is already logged in";
			return response;
		}

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
			const tokenSaved = saveToken(result.token);
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
		// Clear Tokens and Refresh the Page
		clearToken();
		window.location.href = "/";
	},

	forgotPassword() {

	}
};