import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import validateCharacters from '../../common/utilities/validateCharacters';
import validateEmail from '../../common/utilities/validateEmail';
import { check_organization } from '../../api';

import LoginFooter from '../../common/components/LoginFooter';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organizationName: "",
			organizationValid: false,
			emailAddress: "",
			password: "",
			register: false,
			forgotPassword: false,
			loading: false,
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
		this.forgotPassword = this.forgotPassword.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
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
        this.setState({ loading: true });
        let self = this;
        let errors = this.state.error;
        check_organization(this.state.organizationName).then(response => response.json()).then(function(result) {
			if (result.valid == false) {
				errors.organization = result.msg;
                self.setState({
					error: errors,
					loading: false
                });
                return;
			} else {
                errors.organization = "";
                self.setState({
					error: errors,
                    organizationValid: true,
					loading: false
                });
                return;
            }
		}).catch(function(err) {
			console.log(err);
            self.setState({ loading: false });
		});
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
		if (errors.email == "") {
			this.props.user.login(this.state.username, this.state.password);
		}
	}

	register() {
		this.setState({ register: true });
	}

	forgotPassword() {
		this.setState({ forgotPassword: true });
	}

	resetPassword() {
		let errors = this.state.error;
		
		// Check Email is Valid
		if (validateEmail(this.state.emailAddress) == false) {
			errors.email = "Please enter a valid email address";
		} else {
			errors.email = "";
		}
		this.setState({error: errors});
	}

	render() {
		const { 
			organizationName,
			organizationValid,
			emailAddress,
			password,
			register,
			forgotPassword,
			error,
			disabled
		} = this.state;

		if (register) {
			return <Redirect to='/register'/>;
		}

		return <div>
			{organizationValid == false && !forgotPassword && <div>
				<div>
					<input
						type="text"
						name="organizationName"
						value={organizationName}
						onChange={this.changeField}
						placeholder={"Organization Name"}
						disabled={disabled}
					/>
					@activilog
				</div>
				{error.organization && <div className="error">{error.organization}</div>}
				<div>
					<button type="button" onClick={this.checkOrganization} disabled={disabled}>Continue</button>
				</div>
			</div>}
			{organizationValid == true && !forgotPassword && <div>
				<input
					type="text"
					name="emailAddress"
					value={emailAddress}
					onChange={this.changeField}
					placeholder={"Email Address"}
					disabled={disabled}
				/>
				{error.email && <div className="error">{error.email}</div>}
				<input
					type="password"
					name="password"
					value={password}
					onChange={this.changeField}
					placeholder={"Password"}
					disabled={disabled}
				/>
				{error.password && <div className="error">{error.password}</div>}
				<button type="button" onClick={this.login} disabled={disabled}>Login</button>
				<button type="button" onClick={this.register} disabled={disabled}>Register</button>

				<span className="forgotPassword" onClick={this.forgotPassword} disabled={disabled}>Forgot your Password?</span>
			</div>}
			{forgotPassword && <div>
				<input
					type="text"
					name="emailAddress"
					value={emailAddress}
					onChange={this.changeField}
					placeholder={"Email Address"}
					disabled={disabled}
				/>
				{error.email && <div className="error">{error.email}</div>}
				<button type="button" onClick={this.resetPassword} disabled={disabled}>Reset Password</button>
			</div>}
			<LoginFooter />
		</div>;
	};
};

Login.propTypes = {
	route: PropTypes.object,
	user: PropTypes.object,
};

export default Login;
