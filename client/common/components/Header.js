import React from "react";
import PropTypes from "prop-types";

import { ACCOUNT_TYPE } from "../config";

require('../styles/style.css');

class Header extends React.Component {
	render() {
		const {
			user,
		} = this.props;

		if (user.loggedIn == false || user.userType == ACCOUNT_TYPE.UNREGISTERED || user.userType == null) {
			return null;
		}

		return <div id={"header"}>
			Header Object
		</div>;
	};
};

Header.propTypes = {
	user: PropTypes.object,
};

export default Header;
