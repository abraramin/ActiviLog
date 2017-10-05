import React from "react";
import PropTypes from "prop-types";

class Activites extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			Activites
		</div>;
	};
};

Activites.propTypes = {
	user: PropTypes.object,
};

export default Activites;
