import React from "react";
import PropTypes from "prop-types";

class MissingPath extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			Error 404. Page could not be found.
		</div>;
	};
};

MissingPath.propTypes = {
	prop: PropTypes.boolean,
};

export default MissingPath;
