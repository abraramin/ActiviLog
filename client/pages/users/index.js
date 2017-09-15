import React from "react";
import PropTypes from "prop-types";

class Users extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			Users
		</div>;
	};
};

Users.propTypes = {
	prop: PropTypes.boolean,
};

export default Users;
