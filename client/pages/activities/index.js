import React from "react";
import PropTypes from "prop-types";

import {withRouter} from "react-router-dom";
import { fetch_activities } from '../../api';

import InnerLoader from '../../common/components/InnerLoader';

const path = '/activities'; //for testing

class Activities extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			activities: null,
			error: false,
		};
		
		this.loadActivities = this.loadActivities.bind(this);
	}

	componentDidMount() {
		this.loadActivities();
	}

	loadActivities() {
		let self = this;
		this.setState({ loading: true });
		fetch_activities().then(response => response.json()).then(function(result) {
			if (result.success == true) {
				console.log(result.message);
				self.setState({ loading: false });
			} else {
				self.setState({ loading: false, error: true });
			}
		});
	}
	
	render() {
		const {
			loading,
			activities,
			error,
		} = this.state;

		return <div className="page">
			<div className="header">Activities</div>

			{loading && <InnerLoader />}

			{!loading && error && <div className="text-align-center">
					<img src={require('../../common/images/info.png')} />
					<p>There was an error loading the activities list. Please refresh the page and try again.</p>
			</div>}

			{!loading && activities == null && <div className="text-align-center">
					<img src={require('../../common/images/info.png')} />
					<p>You don't yet have any activities. click the 'Add Activity' menu button to get started.</p>
			</div>}
			
			{!loading && activities != null && <div>
					activities
			</div>}
		</div>
	};
};

Activities.propTypes = {
	user: PropTypes.object,
};

export default withRouter(Activities);
