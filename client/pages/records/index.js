import React from "react";
import PropTypes from "prop-types";

class Records extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	// 	const {
	// 		user,
	// 		logout
	// 	} = this.props;
	//
	// 	const path = window.location.pathname.toString();
	//
	// 	const isAdmin = user.userType == ACCOUNT_TYPE.ADMINISTRATOR;
	// 	const isSupervisor = user.userType == ACCOUNT_TYPE.SUPERVISOR;
	// 	const isUser = user.userType == ACCOUNT_TYPE.USER;
	//
	// 	if (user.loggedIn == false || user.userType == ACCOUNT_TYPE.UNREGISTERED || user.userType == null || isUser) {
	// 		return null;
	// 	}

		return <div>
			Records
		</div>;
	};
};

Records.propTypes = {
	user: PropTypes.object,
};

export default Records;
