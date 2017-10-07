import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Collapsible from "react-collapsible";

import { ACCOUNT_TYPE } from "../../common/config";

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
			{displayAdmin && <div className="page">
				<div className="welcome">
					Welcome <strong>{user.fullName}</strong>
				</div>
				<div className="box">
					<div className="container">
						<div className="pill">
							<Link to={{pathname: '/records'}}>
								<img src="../../common/images/Records.png" alt="VIEW RECORDS"/> 
								<p>View Student Records</p>
							</Link>
						</div>
					</div>
					<div className="container">
						<div className="pill">
							<Link to={{pathname: '/activities'}}>
								<img src="../../common/images/Activities.png" alt="VIEW ACTIVITIES" /> 
								<p>View & Update Activities</p>
							</Link>
						</div>
					</div>
					<div className="container">
						<div className="pill">
							<Link to={{pathname: '/users'}}>
								<img src="../../common/images/User.png" alt="MANAGE ACCOUNTS"/> 
								<p>Create & Manage Users</p>
							</Link>
						</div>
					</div>
				</div>
			</div>}
			{displayUser && <div>
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
