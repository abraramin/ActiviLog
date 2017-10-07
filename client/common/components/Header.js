import React from "react";
import PropTypes from "prop-types";

import { Link } from 'react-router-dom';

import { ACCOUNT_TYPE } from "../config";

require('../styles/header.css');

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			user,
			logout
		} = this.props;

		if (user.loggedIn == false || user.userType == ACCOUNT_TYPE.UNREGISTERED || user.userType == null) {
			return null;
		}

		const isAdmin = user.userType == ACCOUNT_TYPE.ADMINISTRATOR;
		const isSupervisor = user.userType == ACCOUNT_TYPE.SUPERVISOR;
		const isUser = user.userType == ACCOUNT_TYPE.USER;

		if(isUser) {
			return <div id={"header"}>
			<div>
				<ul>
					<div className="logo"><Link to={{pathname: '/'}}>
						<img src={require('../images/logo_text.png')} />
					</Link></div>
					<li><span><Link to={{pathname: '/'}}>Home</Link></span></li>
					<li><span><Link to={{pathname: '/publish'}}>Publish</Link></span></li>
					<li id={"logout-button"}><span><a onClick={this.props.logout}>Logout</a></span></li>
				</ul>
			</div>
			</div>;
		}
		if(isAdmin || isSupervisor) {
			return <div id={"header"}>
			<div>
				<ul>
					<div className="logo"><Link to={{pathname: '/'}}>
						<img src={require('../images/logo_text.png')} />
					</Link></div>
					<li><span><Link to={{pathname: '/'}}>Home</Link></span></li>
					<li><span><Link to={{pathname: '/records'}}>Records</Link></span></li>
					<li><span><Link to={{pathname: '/activities'}}>Activities</Link></span></li>
					<li><span><Link to={{pathname: '/users'}}>Users</Link></span></li>
					<li className={"logout-button"}><span><a onClick={this.props.logout}>Logout</a></span></li>
				</ul>
			</div>
			</div>;
		}
	};
};

Header.propTypes = {
	user: PropTypes.object,
	logout: PropTypes.func,
	path: PropTypes.object,
};

export default Header;
