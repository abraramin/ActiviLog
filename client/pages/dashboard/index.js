import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import Collapsible from 'react-collapsible';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loggedIn: false, //TODO get from session info.
			AccType: "", //TODO get from session info.
			Activities: {
				//loaded from activities list
			}
		};
		
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
			loggedIn,
			AccType, 
			Activities
		} = this.state;
		
		if (!loggedIn) {
			return <Redirect to='/login'/>;
		}
		
		return <div> 
			{loggedIn && AccType == "admin" && <div>
				<div>
					<img src="activities.png" alt="VIEW ACTIVITIES" onClick={this.activities} /> 
				</div>
				<div>
					<img src="records.png" alt="VIEW RECORDS" onClick={this.records}/> 
				</div>
				<div>
					<img src="users.png" alt="MANAGE ACCOUNTS" onClick={this.users}/> 
				</div>
			</div>}
			{loggedIn && AccType == "student" && <div> 
				<ActivityList activities={this.state.activites} />//TODO Activities List from Mockup Template
				//Make new class called ActivityList for Dynamically listing activities and making them expandable using react-collapsible.
			</div>}
		</div>;
	};
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

export default Dashboard;
