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
	user: PropTypes.object,
	role: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
	feature: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
};

export default AuthenticatedRoute;
