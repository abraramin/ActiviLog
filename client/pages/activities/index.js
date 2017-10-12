import React from "react";
import PropTypes from "prop-types";

const path = '/activities'; //for testing

class Activities extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			activityTitle: "",
			activityDesc: "",
			colorPicker: "",
		};
		
		this.changeField=this.changeField.bind(this);
	}

	save() {
		
	}
	
	changeField(evt) {
		this.setState({[evt.target.name]: evt.target.value});
	}
	
	render() {
		const {
			activityTitle,
			activityDesc,
			colorPicker
		} = this.state;
		
		return <div className="page">
				{path == '/activities/add' && <div className="addActivity">
					<h2>Add New Activity</h2>
					<div className="activityForm">
						<input
							type="text"
							name="activityTitle"
							value={activityTitle}
							onChange={this.changeField}
							placeholder={"Activity Title"}
						/>
							<input
							type="text"
							name="activityDesc"
							value={activityDesc}
							onChange={this.changeField}
							placeholder={"Description"}
						/>
						<input
							type="text"
							name="colorPicker"
							value={colorPicker}
							onChange={this.changeField}
							placeholder={"Color Picker Placeholder"}
						/>
						<button type="button">Save</button>
					</div>
				</div>}
				{path == '/activities' && <div className="activityList">
					<h2>Activities List</h2>
				</div>}
		</div>;
	};
};

Activities.propTypes = {
	user: PropTypes.object,
};

export default Activities;
