import React from "react";
import PropTypes from "prop-types";
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

class RedirectRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			path,
			user,
			role,
		} = this.props;

		// Show register page if user is not logged in
		if (path == "/register" && (user.token == null && user.loggedIn == false)) {
			return <Route {...this.props} />;
		}

		if(path === '/setup' || path === '/set_up' || path === '/set_up.html')
		{
			window.location.href = "https://github.com/Perth155/ActiviLog/wiki/Beginners-Guide-to-Setting-up-ActiviLog-Web-Application";
		}

		// Redirect if user is not logged in and tries to access restricted page
		if (path !== "/login" && (user.token == null && user.loggedIn == false)) {
			return <Redirect to='/login'/>;
		}

		// Redirect if incorrect role
		if (role != null && role.indexOf(user.userType) == -1) {
			return <Redirect to='/'/>;
		} else {
			return <Route {...this.props} />;
		};

		return <Route {...this.props} />;
	};
};

RedirectRoute.propTypes = {
	user: PropTypes.object,
	role: PropTypes.oneOfType([PropTypes.array]),
};

export default RedirectRoute;
