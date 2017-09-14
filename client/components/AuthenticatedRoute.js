import React from "react";
import PropTypes from "prop-types";
import { Route } from 'react-router';

class AuthenticatedRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return <Route {...this.props} />;
	};
};

AuthenticatedRoute.propTypes = {
	anyRole: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
	anyFeature: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
	loggedInUser: PropTypes.object,
	hasAnyRole: PropTypes.func,
	hasAnyFeature: PropTypes.func,
};

export default AuthenticatedRoute;
