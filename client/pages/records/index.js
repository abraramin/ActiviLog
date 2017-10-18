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
						title: result.title,
						description: result.description,
						color: result.color,
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

		return <div className="page width100">
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
							<th style={{ "width": "30%" }}>Name</th>
							<th>Description</th> 
							<th style={{ "width": "10%" }}>Colour</th>
							<th style={{ "width": "10%" }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{!loading && records != null && records.map(res => {
							return <tr key={res.id}>
								<th style={{"fontWeight": "bold" }}>{res.title}</th>
								<th>{res.description}</th>
								<th style={{"background": res.color }} />
								<th>
									<button type="button" style={{"background": "#4CAF50", "color" : "white", "textAlign": "center", "textDecoration": "none", "border":"none", "display": "inline-block", "fontSize": "16px", "cursor": "pointer", "borderRadius" : "3px"}} onClick={() => this.props.history.push("records/edit/" + res.id)}>
											<p> <img src={require('../../common/images/create-new-pencil-button.png')} /> Edit</p>
								  	</button>
								</th>
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
