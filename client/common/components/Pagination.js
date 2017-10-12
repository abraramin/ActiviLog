import React from "react";
import PropTypes from "prop-types";

require('../styles/style.css');

class Pagination extends React.Component {
	render() {
		const {
			page,
			pageItems,
			totalResults,
			changePage,
			disabled,
		} = this.props;

		let showPrevious = true;
		let showNext = true;

		if ((page * pageItems) >= totalResults) {
			showNext = false;
		};

		if (page == 1) {
			showPrevious = false;
		};

		return <div className="pagination">
			{!disabled && showPrevious && <button type="button" className="backward" onClick={this.backward}>Previous</button>}
			{!disabled && showNext && <button type="button" className="forward" onClick={this.forward}>Next</button>}
		</div>;
	};
};

Pagination.propTypes = {
	page: PropTypes.number,
	pageItems: PropTypes.number,
	totalResults: PropTypes.number,
	changePage: PropTypes.func,
	disabled: PropTypes.bool,
};

export default Pagination;