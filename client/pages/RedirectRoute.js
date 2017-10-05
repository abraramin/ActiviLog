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
		} = this.props;

		// Show register page if user is not logged in
		if (path == "/register" && (user.profile.token == null && user.profile.loggedIn == false)) {
			return <Route {...this.props} />;
		}

		// Redirect if user is not logged in and tries to access restricted page
		if (path !== "/login" && (user.profile.token == null && user.profile.loggedIn == false)) {
			return <Redirect to='/login'/>;
		}

		// Redirect if we have a token
		if ((path == "/login" || path == "/register") && (user.profile.token != null)) {
			return <Redirect to='/'/>;
		}

		return <Route {...this.props} />;
	};
};

RedirectRoute.propTypes = {
	user: PropTypes.object,
};

export default RedirectRoute;
