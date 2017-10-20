import React from "react";
import PropTypes from "prop-types";

import {withRouter} from "react-router-dom";
import { fetch_records, search_records } from '../../api';

import moment from 'moment';
import InnerLoader from '../../common/components/InnerLoader';
import Pagination from '../../common/components/Pagination';

class Records extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			records: null,
			error: false,
			page: 1,
			pageItems: 100000,
			totalResults: 0,
		};
		
		this.changePage = this.changePage.bind(this);
		this.loadRecords = this.loadRecords.bind(this);
		this.searchRecords = this.searchRecords.bind(this);
	}

	componentDidMount() {
		this.loadRecords(this.state.page, this.state.pageItems);
	}

	componentWillReceiveProps() {
		const fullstr = document.location.pathname.toString();
		const tmpfullsre = fullstr.split("/");
		if (tmpfullsre[2] == "csv") {
			this.props.history.push("/records");
		}
   }

	changePage(direction) {
		if (direction == "forward") {
			const page = this.state.page + 1;
			this.loadRecords(page, this.state.pageItems);
		} else {
			const page = this.state.page - 1;
			this.loadRecords(page, this.state.pageItems);
		}
	}

	loadRecords(page, pageItems) {
		let self = this;
		this.setState({ loading: true });
		fetch_records(page, pageItems).then(response => response.json()).then(function(result) {
			if (result.success == true) {
				let records = [];
				result.result.map(function(result) {
					const values = {
						id: result._id,
						userId: result.user_details._id,
						fullName: result.user_details.fullName,
						email: result.user_details.email,
						title: result.title,
						description: result.description,
						date: result.startTime,
						startTime: result.startTime,
						endTime: result.endTime,
						activity: result.activity_info.title,
						activityColor: result.activity_info.color,
						discipline: result.discipline,
						location: result.location,
						notes: result.notes,
					}
					return records.push(values);
				});
				if (records.length == 0) {
					records = null;
				}
				Object.freeze(records);
				self.setState({ loading: false, records: records, page: result.page, totalResults: result.total });
			} else {
				self.setState({ loading: false, records: null, error: true });
			}
		});
	}
	
	searchRecords(page, pageItems, searchText) {
		let self = this;
		this.setState({ loading: true });
		search_records(page, pageItems, searchText).then(response => response.json()).then(function(result) {
			if (result.success == true) {
				let records = [];
				result.result.map(function(result) {
					const values = {
						id: result._id,
						userId: result.user_details._id,
						fullName: result.user_details.fullName,
						email: result.user_details.email,
						title: result.title,
						description: result.description,
						startTime: result.startTime,
						endTime: result.endTime,
						activity: result.activity_info.title,
						activityColor: result.activity_info.color,
						discipline: result.discipline,
						location: result.location,
						notes: result.notes,
					}
					return records.push(values);
				});
				if (records.length == 0) {
					records = null;
				}
				Object.freeze(records);
				self.setState({ loading: false, records: records, page: result.page, totalResults: result.total });
			} else {
				self.setState({ loading: false, records: null, error: true });
			}
		});
	}

	render() {
		const {
			loading,
			records,
			error,
		} = this.state;

		return <div className="records width100">
			<div className="header">Records</div>
			{loading && <InnerLoader />}

			{!loading && error && <div className="text-align-center">
					<img src={require('../../common/images/info.png')} />
					<p>There was an error loading the records list. Please refresh the page and try again.</p>
			</div>}

			{!loading && !error && records == null && <div className="text-align-center">
					<img src={require('../../common/images/info.png')} />
					<p>The record list is empty! No users have posted an event to their account.</p>
			</div>}

			{!loading && !error && records !== null && <div>
				<div className="record-table">
					<table>
						<thead>
							<tr>
								<th style={{ "width": "10%" }}>Name</th>
								<th style={{ "width": "10%" }}>Email</th> 
								<th>Title</th>
								<th>Description</th>
								<th>Date</th>
								<th>StartTime</th>
								<th>EndTime</th>
								<th>Discipline</th>
								<th>Location</th>
								<th style={{ "width": "20%" }}>Notes</th>
								<th>Activity</th>
							</tr>
						</thead>
						<tbody>
							{!loading && records != null && records.map(res => {
								return <tr key={res.id}>
									<th>{res.fullName}</th>
									<th>{res.email}</th>
									<th style={{"fontWeight": "bold" }}>{res.title}</th>
									<th>{res.description}</th>
									<th>{moment(res.date).format("DD/MM/YY")}</th>
									<th>{moment(res.startTime).format("h:mm a")}</th>
									<th>{moment(res.endTime).format("h:mm a")}</th>
									<th>{res.discipline}</th>
									<th>{res.location}</th>
									<th>{res.notes}</th>
									<th style={{"background": res.activityColor }}>{res.activity}</th>
								</tr>
							})}
						</tbody>
				</table>
				<Pagination page={this.state.page} pageItems={this.state.pageItems} totalResults={this.state.totalResults} changePage={this.changePage} disabled={loading} />
				</div>
			</div>}
		</div>
	};
};

Records.propTypes = {
	user: PropTypes.object,
};

export default withRouter(Records);
