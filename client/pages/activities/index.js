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
				let activities = [];
				result.message.map(function(result) {
					const values = {
						id: result._id,
						title: result.title,
						description: result.description,
						color: result.color,
					}
					return activities.push(values);
				});
				Object.freeze(activities);
				self.setState({ loading: false, activities: activities });
			} else {
				self.setState({ loading: false, activities: null, error: true });
			}
		});
	}
	
	render() {
		const {
			loading,
			activities,
			error,
		} = this.state;

		return <div className="page width80">
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
				<div>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th> 
								<th>Colour</th>
							</tr>
						</thead>
						<tbody>
							{activities.map(res => {
								return <tr key={res.id} onClick={() => this.props.history.push("activities/edit/" + res.id)}>
									<th style={{ "width": "30%" }}>{res.title}</th>
									<th>{res.description}</th>
									<th style={{"background": res.color, "width": "10%" }} />
								</tr>
							})}
						</tbody>
					</table>
				</div>
			</div>}
		</div>
	};
};

Activities.propTypes = {
	user: PropTypes.object,
};

export default withRouter(Activities);
