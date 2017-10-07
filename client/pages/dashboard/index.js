import React from "react";
import PropTypes from "prop-types";

import { ACCOUNT_TYPE } from "../../common/config";

import Admin from './components/admin';
import User from './components/user';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const {
			user,
		} = this.props;

		const displayAdmin = (user.loggedIn && (user.userType == ACCOUNT_TYPE.ADMINISTRATOR || user.userType == ACCOUNT_TYPE.SUPERVISOR));
		const displayUser = user.loggedIn && user.userType == ACCOUNT_TYPE.USER;
		
		return <div id="dashboard">
			{displayAdmin && <Admin user={user} />}
			{displayUser && <User user={user} />}
		</div>;
	};
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

export default Dashboard;
