import { login as UserLogin } from '../../api';

export default {

	user: "User object here",

	fetch() {
		console.log("Do a fetch load");
	},

	saveToken() {

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