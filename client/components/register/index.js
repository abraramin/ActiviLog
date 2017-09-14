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
	prop: PropTypes.boolean,
};

export default Register;
