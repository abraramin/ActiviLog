import React from "react";
import PropTypes from "prop-types";

class SelectColor extends React.Component {
	constructor(props) {
		super(props);

		this.selectColor = this.selectColor.bind(this);
	}

	selectColor(val) {
		if (this.props.disabled != true) {
			if (this.props.color == val.target.value) {
				this.props.selectColor("");
			} else {
				this.props.selectColor(val.target.value);
			};
		}
	}

	render() {
		const {
			color,
		} = this.props;

		return <div id="color-selector">
			<label>Color</label>
			<div className="color">
				<button value="red" style={{"background": "red"}} className={color == "red" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="blue" style={{"background": "blue"}} className={color == "blue" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="green" style={{"background": "green"}} className={color == "green" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="magenta" style={{"background": "magenta"}} className={color == "magenta" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="yellow" style={{"background": "yellow"}} className={color == "yellow" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="black" style={{"background": "black"}} className={color == "black" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="cyan" style={{"background": "cyan"}} className={color == "cyan" ? "active" : ""} onClick={this.selectColor}></button>
			</div>
			{this.props.error && <div className="error">{this.props.error}</div>}
		</div>;
	};
};

SelectColor.propTypes = {
	color: PropTypes.string,
	error: PropTypes.string,
	selectColor: PropTypes.func,
	disabled: PropTypes.bool,
};

export default SelectColor;
