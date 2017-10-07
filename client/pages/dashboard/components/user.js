import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Collapsible from "react-collapsible";

class User extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="page">
			User
		</div>;
	};
};

User.propTypes = {
	user: PropTypes.object,
};

export default User;
