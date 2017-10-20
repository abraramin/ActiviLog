import React from "react";
import {withRouter} from "react-router-dom";

class Search extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			search: ""
		}
		
		this.changeField = this.changeField.bind(this);
	}
	
	changeField(evt) {
		if (evt.target.name == "search") {
			if (validateCharacters(evt.target.value)) {
				this.setState({[evt.target.name]: evt.target.value});
				return;
			} else {
				return;
			}
		}

		this.setState({[evt.target.name]: evt.target.value});
	}
	
	render() {
		const {
			search
		} = this.state
		
		return <li className={"search-bar"}>
			<li>
				<input
					type="text"
					value={search}
					placeholder={"Search"}
					className="search-field"
					onChange={this.changeField}
				/>
			</li>
			<li>
				<button className={"search-button"}>
						<img src={require('../images/search_button.png')} />
				</button>
			</li>
		</li>
	};
};

export default withRouter(Search);
