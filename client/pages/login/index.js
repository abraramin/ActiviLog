import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';

import validateCharacters from '../../common/utilities/validateCharacters';
import validateEmail from '../../common/utilities/validateEmail';

import LoginFooter from '../../common/components/LoginFooter';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organizationName: "",
			organizationValid: true,
			emailAddress: "",
			password: "",
			register: false,
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
			if (validateCharacters(evt.target.value)) {
				this.setState({[evt.target.name]: evt.target.value});
				return;
			} else {
				return;
			}
		}

		this.setState({[evt.target.name]: evt.target.value});
	}

	checkOrganization() {
		
	}

	login() {
		let errors = this.state.error;

		// Check Email is Valid
		if (validateEmail(this.state.emailAddress) == false) {
			errors.email = "Please enter a valid email address";
		} else {
			errors.email = "";
		}
		this.setState({error: errors});
	}

	register() {
		this.setState({ register: true });
	}

	render() {
		const { 
			organizationName,
			organizationValid,
			emailAddress,
			password,
			register,
			error
		} = this.state;

		if (register) {
			return <Redirect to='/register'/>;
		}

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
