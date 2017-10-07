import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import Collapsible from "react-collapsible";

import { ACCOUNT_TYPE } from "../../common/config";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		
		this.activities = this.activities.bind(this);
		this.records = this.records.bind(this);
		this.users = this.users.bind(this);	
	}

	activities() {
		return this.props.history.push('/activities'); //URL to view activities as admin
	}
	
	records () {
		return this.props.history.push('/records'); //URL to view records as admin
	}
	
	users () {
		return this.props.history.push('/user'); //URL to view user accounts as admin
	}
	
	render() {
		const {
			user,
		} = this.props;
		
		return <div>
			{user.loggedIn && (user.userType == ACCOUNT_TYPE.ADMINISTRATOR || user.userType == ACCOUNT_TYPE.SUPERVISOR) && <div>
				<div>
					<img src="../../common/images/Activities.png" alt="VIEW ACTIVITIES" onClick={this.activities} /> 
				</div>
				<div>
					<img src="../../common/images/Records.png" alt="VIEW RECORDS" onClick={this.records}/> 
				</div>
				<div>
					<img src="../../common/images/User.png" alt="MANAGE ACCOUNTS" onClick={this.users}/> 
				</div>
			</div>}
			{user.loggedIn && user.userType == ACCOUNT_TYPE.USER && <div>
				<div>
					STUDENT DASH //Dynamic Activity List using Collapsible
				</div>
			</div>}
		</div>;
	};
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

export default Dashboard;
