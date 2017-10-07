import React from "react";
import PropTypes from "prop-types";

import { ACCOUNT_TYPE } from "../config";

require('../styles/header.css');

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.activities = this.activities.bind(this);
		this.records = this.records.bind(this);
		this.users = this.users.bind(this);
	}

activities() {
	return <Redirect to='/activities'/>; //URL to view activities as admin
}

records () {
	return <Redirect to='/records'/>; //URL to view records as admin
}

users () {
	return <Redirect to='/users'/>; //URL to view user accounts as admin
}

	render() {
		const {
			user,
			logout
		} = this.props;

		if (user.loggedIn == false || user.userType == ACCOUNT_TYPE.UNREGISTERED || user.userType == null) {
			return null;
		}

		const isAdmin = user.userType == ACCOUNT_TYPE.ADMINISTRATOR;
		const isSupervisor = user.userType == ACCOUNT_TYPE.SUPERVISOR;
		const isUser = user.userType == ACCOUNT_TYPE.USER;

		if(isUser)
		{
			return <div id={"header"}>
			<div>
				<ul>
					<li><a>Activilog</a></li>
					<li><a>Home</a></li>
					<li><a>Add</a></li>
					<li id={"logout-button"}><a onClick={this.props.logout}>Logout</a></li>
				</ul>
			</div>
			</div>;
		}
		if(isAdmin || isSupervisor)
		{
			return <div id={"header"}>
			<div>
				<ul>
					<li><a>Home</a></li>
					<li><a>Record</a></li>
					<li><a>Activities</a></li>
					<li><a>Accounts</a></li>
					<li className={"logout-button"}><a onClick={this.props.logout}>Logout</a></li>
				</ul>
			</div>
			</div>;
		}
	};
};


Header.propTypes = {
	user: PropTypes.object,
	logout: PropTypes.func,
};

export default Header;
