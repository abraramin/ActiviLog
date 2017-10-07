import React from "react";
import PropTypes from "prop-types";

class Records extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			Records
		</div>;
	};
};

Records.propTypes = {
	user: PropTypes.object,
};

export default Records;
