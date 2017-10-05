import React from "react";
import PropTypes from "prop-types";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			Dashboard
		</div>;
	};
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

export default Dashboard;
