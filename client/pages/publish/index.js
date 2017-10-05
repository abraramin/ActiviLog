import React from "react";
import PropTypes from "prop-types";

class Publish extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			Publish
		</div>;
	};
};

Publish.propTypes = {
	user: PropTypes.object,
};

export default Publish;
