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
			<label>Colour</label>
			<div className="color">
				<button value="Red" style={{"background": "Red"}} className={color == "Red" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="Blue" style={{"background": "Blue"}} className={color == "Blue" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="Green" style={{"background": "Green"}} className={color == "Green" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="Magenta" style={{"background": "Magenta"}} className={color == "Magenta" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="Yellow" style={{"background": "Yellow"}} className={color == "Yellow" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="Grey" style={{"background": "Grey"}} className={color == "Grey" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="Cyan" style={{"background": "Cyan"}} className={color == "Cyan" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="LightCoral" style={{"background": "LightCoral"}} className={color == "LightCoral" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="LightSkyBlue" style={{"background": "LightSkyBlue"}} className={color == "LightSkyBlue" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="MediumPurple" style={{"background": "MediumPurple"}} className={color == "MediumPurple" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="OliveDrab" style={{"background": "OliveDrab"}} className={color == "OliveDrab" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="SaddleBrown" style={{"background": "SaddleBrown"}} className={color == "SaddleBrown" ? "active" : ""} onClick={this.selectColor}></button>
				<button value="Violet" style={{"background": "Violet"}} className={color == "Violet" ? "active" : ""} onClick={this.selectColor}></button>
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
