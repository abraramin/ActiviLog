import React from "react";
import PropTypes from "prop-types";

import SelectColor from './components/colors';
import { check_organization } from '../../api';

class AddActivity extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			description: "",
			color: "",
			loading: false,
			error: {
				title: null,
				description: null,
				color: null,
				generic: null,
			}
		};

		this.addActivity = this.addActivity.bind(this);
		this.changeField = this.changeField.bind(this);
		this.selectColor = this.selectColor.bind(this);
	}

	addActivity() {
		this.setState({ loading: true });
		let errors = this.state.error;
		errors.title = "";
		errors.description = "";
		errors.color = "";
		errors.generic = "";

		// Check fields are not empty
		if (this.state.title.trim() == "") {
			errors.title = "Please add an activity title";
		} else {
			errors.title = "";
		}
		if (this.state.description.trim() == "") {
			errors.description = "Please enter a description for this activity";
		} else {
			errors.description = "";
		}
		if (this.state.color.trim() == "") {
			errors.color = "Please assign a color to this activity";
		} else {
			errors.color = "";
		}

		// Attempt save to database
		if (errors.title == "" && errors.description == "" && errors.color == "") {
			//this.props.login(properties);
			this.setState({ loading: false });
		} else {
			this.setState({ loading: false });
		}
		this.setState({error: errors});
	}

	changeField(evt) {
		this.setState({[evt.target.name]: evt.target.value});
	}

	selectColor(val) {
		this.setState({color: val});
	}

	render() {
		const { 
			title,
			description,
			color,
			error,
			loading
		} = this.state;

		const {
			user,
		} = this.props;

		return <div className="page">
			<div className="box">
					<div className="title">Add New Activity</div>
					<div className="components">
						<div className="input">
							<label>Title</label>
							<input
								type="text"
								name="title"
								value={title}
								onChange={this.changeField}
								disabled={loading}
								placeholder="Title of the Activity"
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
								placeholder="A short description of the Activity"
							/>
							{error.description && <div className="error">{error.description}</div>}
						</div>
						<div className="input">
							<SelectColor color={color} error={error.color} selectColor={this.selectColor} disabled={loading} />
						</div>
						{error.generic && <div className="error">{error.generic}</div>}
						<div>
							<button type="button" className="submit" onClick={this.addActivity} disabled={loading}>{loading && <Spinner />}Save</button>
						</div>
					</div>
			</div>
		</div>;
	};
};

AddActivity.propTypes = {
	user: PropTypes.object,
};

export default AddActivity;
