import React from "react";
import PropTypes from "prop-types";
import Collapsible from 'react-collapsible';

class Activites extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<ActivityList activities={this.state.activites} />//TODO Activities List from Mockup Template
				//Make new class called ActivityList for Dynamically listing activities and making them expandable using react-collapsible.
				//Students and Admins have different views (admins can search and view them as records)
		</div>;
	};
};

Activites.propTypes = {
	user: PropTypes.object,
};

export default Activites;
