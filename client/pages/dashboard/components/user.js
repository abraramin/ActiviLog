import React from "react";
import PropTypes from "prop-types";
import Collapsible from "react-collapsible";

//Need to query the database to load all activities associated with a user.
//Then diplay them in the collapsible list items.

class User extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			user,
		} = this.props;
		
		return <div className="page">
			<div className="welcome">
				Welcome <strong>{user.fullName}</strong>
			</div>
			<Collapsible trigger="Activity 1">
				<p1>Collapsible test, if you can see this it's working.</p1>
			</Collapsible>
			<Collapsible trigger="Activity 2">
				<p1>Collapsible test, if you can see this it's working.</p1>
			</Collapsible>
			<Collapsible trigger="Activity 3">
				<p1>Collapsible test, if you can see this it's working.</p1>
			</Collapsible>
		</div>;
	};
};

User.propTypes = {
	user: PropTypes.object,
};

export default User;
