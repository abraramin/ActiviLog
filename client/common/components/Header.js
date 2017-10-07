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
						<img src={require('../images/logo_text_small.png')} />
					</Link></div>
					<li>
						<Link to={{pathname: '/'}}>
							<img src={require('../images/menu_home.png')} />
							<span>Home</span>
						</Link>
					</li>
					<li>
						<Link to={{pathname: '/publish'}}>
							<img src={require('../images/menu_add.png')} />
							<span>Publish</span>
						</Link>
					</li>
					<li className={"logout-button"}>
						<a onClick={this.props.logout}>
							<img src={require('../images/menu_logout.png')} />
							<span>Logout</span>
						</a>
					</li>
				</ul>
			</div>
			</div>;
		}
		if(isAdmin || isSupervisor) {
			return <div id={"header"}>
			<div>
				<ul>
					<div className="logo"><Link to={{pathname: '/'}}>
						<img src={require('../images/logo_text_small.png')} />
					</Link></div>
					<li>
						<Link to={{pathname: '/'}}>
							<img src={require('../images/menu_home.png')} />
							<span>Home</span>
						</Link>
					</li>
					<li>
						<Link to={{pathname: '/records'}}>
							<img src={require('../images/menu_records.png')} />
							<span>Records</span>
						</Link>
					</li>
					<li>
						<Link to={{pathname: '/activities'}}>
							<img src={require('../images/menu_activities.png')} />
							<span>Activities</span>
						</Link>
					</li>
					<li>
						<Link to={{pathname: '/users'}}>
							<img src={require('../images/menu_accounts.png')} />
							<span>Accounts</span>
						</Link>
					</li>
					<li className={"logout-button"}>
						<a onClick={this.props.logout}>
							<img src={require('../images/menu_logout.png')} />
							<span>Logout</span>
						</a>
					</li>
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
