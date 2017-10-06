import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';

import { ACCOUNT_TYPE } from "../../common/config";

class Dashboard extends React.Component {
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
		} = this.props;
	
		return <div> 
			{user.loggedIn && user.userType == ACCOUNT_TYPE.ADMINISTRATOR || ACCOUNT_TYPE.SUPERVISOR && <div>
				<div>
					<img src="../../common/images/Activities.png" alt="VIEW ACTIVITIES" onClick={this.activities} /> 
				</div>
				<div>
					<img src="../../common/images/Records.png" alt="VIEW RECORDS" onClick={this.records}/> 
				</div>
				<div>
					<img src="../../common/images/Users.png" alt="MANAGE ACCOUNTS" onClick={this.users}/> 
				</div>
			</div>}
		</div>;
	};
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

export default Dashboard;
