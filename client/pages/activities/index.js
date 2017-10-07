import React from "react";
import PropTypes from "prop-types";
import Collapsible from 'react-collapsible';

class Activities extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
				//TODO Activities List from Mockup Template
				//Make new class called ActivityList for Dynamically listing activities and making them expandable using react-collapsible.
				//Students and Admins have different views (admins can search and view them as records)
		</div>;
	};
};

Activities.propTypes = {
	user: PropTypes.object,
};

export default Activities;
