import React from "react";
import Collapsible from "react-collapsible"; 

class List extends React.Component {
	render() {
		return <ul>
			{this.props.list.map((val) => 
				<Collapsible trigger={val}> 
					 The Activities for the date go here as a list.
					 //TODO: Fix list loading, add edit buttons/delete buttons, trigger name should be the day and date.
				</Collapsible>
			)}
		</ul>
	};
};

export default List;
