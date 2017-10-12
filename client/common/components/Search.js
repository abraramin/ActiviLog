import React from "react";

class Search extends React.Component {
	render() {
		return <li className={"search-bar"}>
			<li>
				<input
					type="text"
					placeholder={"Search"}
					className="search-field"
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

export default Search;
