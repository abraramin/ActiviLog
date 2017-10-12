import React from "react";
import PropTypes from "prop-types";

require('../styles/style.css');

class InnerLoader extends React.Component {
	render() {
		return <div className="page-spinner" />;
	};
};

export default InnerLoader;