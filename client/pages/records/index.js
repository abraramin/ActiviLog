import React from "react";
import PropTypes from "prop-types";

import {withRouter} from "react-router-dom";
import { fetch_records } from '../../api';

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
			pageItems: 10,
			totalResults: 0,
		};
		
		this.changePage = this.changePage.bind(this);
		this.loadRecords = this.loadRecords.bind(this);
	}

	componentDidMount() {
		this.loadRecords(this.state.page, this.state.pageItems);
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
					console.log(result);
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

		console.log(records);

		return <div className="records width100">
			<div className="header">Post Records</div>
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
							<th>Activity</th>
							<th>Discipline</th>
							<th>Location</th>
							<th style={{ "width": "20%" }}>Notes</th>
						</tr>
					</thead>
					<tbody>
						{!loading && records != null && records.map(res => {
							return <tr key={res.id}>
								<th>{res.fullName}</th>
								<th>{res.email}</th>
								<th style={{"fontWeight": "bold" }}>{res.title}</th>
								<th>{res.description}</th>
								<th></th>
								<th>{res.startTime}</th>
								<th>{res.endTime}</th>
								<th>{res.activity}</th>
								<th>{res.discipline}</th>
								<th>{res.location}</th>
								<th>{res.notes}</th>
							</tr>
						})}
					</tbody>
			</table>
			<Pagination page={this.state.page} pageItems={this.state.pageItems} totalResults={this.state.totalResults} changePage={this.changePage} disabled={loading} />
			</div>}
		</div>
	};
};

Records.propTypes = {
	user: PropTypes.object,
};

export default withRouter(Records);
