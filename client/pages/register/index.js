import React from "react";
import PropTypes from "prop-types";

class Register extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			Register
		</div>;
	};
};

Register.propTypes = {
	user: PropTypes.object,
};

export default Register;
