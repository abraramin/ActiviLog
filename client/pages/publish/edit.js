import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import { fetch_single_post, edit_post, delete_post } from '../../api';

import moment from 'moment';
import Spinner from '../../common/components/Spinner';
import {notify} from 'react-notify-toast';
import TimePicker from 'react-times';

import 'react-times/css/classic/default.css';

class EditPost extends React.Component {
	constructor(props) {
		super(props);

		const dateToday = moment().format();

		this.state = {
			id: "",
			title: "",
			description: "",
			startTime: "13:00",
			endTime: "14:30",
			discipline: "",
			location: "",
			notes: "",
			loading: false,
			deleting: false,
			saving: false,
			error: {
				title: null,
				description: null,
				discipline: null,
				date: null,
				location: null,
				notes: null,
				generic: null,
			}
		};

		this.loadPost = this.loadPost.bind(this);
		this.editPost = this.editPost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.changeField = this.changeField.bind(this);
		this.onStartTimeChange = this.onStartTimeChange.bind(this);
		this.onEndTimeChange = this.onEndTimeChange.bind(this);
	}

	componentDidMount() {
		this.loadPost();
	}
	
	//TODO*******
	loadPost() {
		this.setState({ loading: true });
		const id = document.location.pathname.toString().substr(17);
		let self = this;
		fetch_single_post(id).then(response => response.json()).then(function(result) {
			if (result.success) {
				self.setState({
					id: result.message.id,
					title: result.message.title,
					description: result.message.description,
					loading: false
				});
			} else {
				self.props.history.push("/");
			}
		});
	}
	
	deletePost() {
		this.setState({ loading: true, deleting: true });
		const id = this.state.id;
		let self = this;
		delete_post(id).then(response => response.json()).then(function(result) {
			if (result.success) {
				self.props.history.push("/");
			} else {
				this.setState({loading: false, deleting: false, error: {
					generic: "Error. This post could not succesfully be deleted. Please refresh the page and try again."
				}});
			}
		});
	}
	
	//TODO******
	editPost() {
		this.setState({ loading: true, saving: true });
		let errors = this.state.error;
		errors.title = "";
		errors.description = "";
		errors.date = "";
		errors.discipline = "";

		// Check fields are not empty
		if (this.state.title.trim() == "") {
			errors.title = "Please add a title for this post";
		} else {
			errors.title = "";
		}
		if (this.state.description.trim() == "") {
			errors.description = "Please enter a description for this post";
		} else {
			errors.description = "";
		}
		
		// Check the two times
		const beginningTime = moment(this.state.startTime, 'hh:mm');
		const endTime = moment(this.state.endTime, 'hh:mm');

		if (beginningTime.isBefore(endTime) == false) {
			errors.date = "Please ensure your start and end times are correct";
		} else {
			errors.date = "";
		}
		if (this.state.discipline.trim() == "") {
			errors.discipline = "Please enter a discipline";
		} else {
			errors.discipline = "";
		}

		// Attempt save to database
		if (errors.title == "" && errors.description == "" && errors.discipline == "") {
			// Construct the final date objects
			const bt = moment(this.state.startTime, 'hh:mm');
			const et = moment(this.state.endTime, 'hh:mm');
			const startTime = moment(this.state.date).set('hours', bt.get('hours')).set('minutes', bt.get('minutes')).toISOString();
			const endTime = moment(this.state.date).set('hours', et.get('hours')).set('minutes', et.get('minutes')).toISOString();

			const properties = {
				id: this.state.id,
				title: this.state.title,
				description: this.state.description,
				discipline: this.state.discipline,
				location: this.state.location,
				startTime: startTime,
				endTime: endTime,
				notes: this.state.notes,
			}
		
			let self = this;
			edit_post(properties).then(response => response.json()).then(function(result) {
				if (result.success == true) {
					notify.show('Post has successfully been updated');
					self.props.history.push("/");
				} else {
					self.setState({ loading: false, saving: false, error: {generic: "Sorry, something went wrong and we could not publish your post. Please refresh the page and try again."} });
				}
			});
		} else {
			this.setState({ loading: false, saving: false });
		}
		this.setState({error: errors});
	}

	changeField(evt) {
		this.setState({[evt.target.name]: evt.target.value});
	}

	onStartTimeChange(time) {
		this.setState({startTime: time});
	}

	onEndTimeChange(time) {
		this.setState({endTime: time});
	}

	render() {
		const { 
			id,
			title,
			description,
			startTime,
			endTime,
			discipline,
			location,
			notes,
			error,
			loading,
			deleting,
			saving,
		} = this.state;

		const {
			user,
		} = this.props;

		let startmer = "AM";
		if (parseInt(startTime.substr(0, 2)) >= 12) {
			startmer = "PM"
		}

		let endmer = "AM";
		if (parseInt(endTime.substr(0, 2)) >= 12) {
			endmer = "PM"
		}

		return <div className="page">
			<div className="box">
					<div className="title">
						<p><img src={require('../../common/images/go_back.png')} onClick={() => this.props.history.push("/")}/> &nbsp; Edit {header}</p>
					</div>
					<div className="components">
						<div className="input">
							<label>Title</label>
							<input
								type="text"
								name="title"
								value={title}
								onChange={this.changeField}
								disabled={loading}
								placeholder="Title of the event"
							/>
							{error.title && <div className="error">{error.title}</div>}
						</div>
						<div className="input">
							<label>Description</label>
							<input
								type="text"
								name="description"
								value={description}
								onChange={this.changeField}
								disabled={loading}
								placeholder="A short description of the event completed"
							/>
							{error.description && <div className="error">{error.description}</div>}
						</div>

						<div className="input">
							<div style={{ "height": "75px" }}>
								<div className="width24 marginr14 float-left">
									<label>Start Time</label>
									<TimePicker
										withoutIcon={true}
										time={startTime}
										theme="classic"
										meridiem={startmer}
										onTimeChange={this.onStartTimeChange}
									/>
								</div>
								<div className="width24 float-left">
									<label>End Time</label>
									<TimePicker
										withoutIcon={true}
										time={endTime}
										theme="classic"
										meridiem={endmer}
										onTimeChange={this.onEndTimeChange}
									/>
								</div>
							</div>
							{error.date && <div className="error">{error.date}</div>}
						</div>
						<div className="input">
							<label>Discipline</label>
							<input
								type="text"
								className="width50"
								name="discipline"
								value={discipline}
								onChange={this.changeField}
								disabled={loading}
								placeholder="Discipline of the activity"
							/>
							{error.discipline && <div className="error">{error.discipline}</div>}
						</div>
						<div className="input">
							<label>Location</label>
							<input
								type="text"
								className="width50"
								name="location"
								value={location}
								onChange={this.changeField}
								disabled={loading}
								placeholder="Location of the activity. Venue, Building etc"
							/>
							{error.location && <div className="error">{error.location}</div>}
						</div>
						<div className="input">
							<label>Notes</label>
							<textarea
								name="notes"
								value={notes}
								onChange={this.changeField}
								disabled={loading}
								placeholder="Any notes or comments you would like to share"
							/>
							{error.notes && <div className="error">{error.notes}</div>}
						</div>

						{error.generic && <div className="error">{error.generic}</div>}
						<div>
							<button type="button" className="submit width60 float-right" onClick={this.editPost} disabled={loading}>{saving && <Spinner />}Update Post</button>
							<button type="button" className="register width30 float-left" onClick={this.deletePost} disabled={loading}>{saving && <Spinner />}Delete Post</button>
						</div>
					</div>
			</div>
		</div>;
	};
};

EditPost.propTypes = {
	user: PropTypes.object,
};

export default withRouter(EditPost);
