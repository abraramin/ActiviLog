import React from "react";
import PropTypes from "prop-types";

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			Login
		</div>;
	};
};

Login.propTypes = {
	prop: PropTypes.boolean,
};

export default Login;
