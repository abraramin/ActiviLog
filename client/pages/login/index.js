import React from "react";
import PropTypes from "prop-types";

import LoginFooter from '../../common/components/LoginFooter';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organizationName: "",
			organizationValid: true,
			emailAddress: "",
			password: "",
			error: {
				organization: null,
				email: null,
				password: null,
			}
		};

		this.changeField = this.changeField.bind(this);
		this.checkOrganization = this.checkOrganization.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
	}

	changeField(evt) {
		if (evt.target.name == "organizationName") {
			if (/^[a-zA-Z()]+$/.test(evt.target.value) || evt.target.value == "") {
				this.setState({[evt.target.name]: evt.target.value});
			} else {
				return;
			}
		} else {
			this.setState({[evt.target.name]: evt.target.value});
		}
	}

	checkOrganization() {
		
	}

	login() {

	}

	register() {

	}

	render() {
		const { 
			organizationName,
			organizationValid,
			emailAddress,
			password,
			error
		} = this.state;

		return <div>
			{organizationValid == false && <div>
				<div>
					<input
						type="text"
						name="organizationName"
						value={organizationName}
						onChange={this.changeField}
						placeholder={"Organization Name"}
					/>
					@activilog
				</div>
				{error.organization && <div className="error">{error.organization}</div>}
				<div>
					<button type="button" onClick={this.checkOrganization}>Continue</button>
				</div>
			</div>}
			{organizationValid == true && <div>
				<input
					type="text"
					name="emailAddress"
					value={emailAddress}
					onChange={this.changeField}
					placeholder={"Email Address"}
				/>
				{error.email && <div className="error">{error.email}</div>}
				<input
					type="text"
					name="password"
					value={password}
					onChange={this.changeField}
					placeholder={"Password"}
				/>
				{error.password && <div className="error">{error.password}</div>}
				<button type="button" onClick={this.login}>Login</button>
				<button type="button" onClick={this.register}>Register</button>
			</div>}
			<LoginFooter />
		</div>;
	};
};

Login.propTypes = {
	prop: PropTypes.boolean,
};

export default Login;
