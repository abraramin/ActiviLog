import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import validateCharacters from '../../common/utilities/validateCharacters';
import validateEmail from '../../common/utilities/validateEmail';
import { check_organization } from '../../api';

import LoginFooter from '../../common/components/LoginFooter';
require('../../common/styles/style.css');

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organizationName: "",
			organizationValid: false,
			emailAddress: "",
			password: "",
			forgotPassword: false,
			loading: false,
			register: false,
			loggedIn: false,
			error: {
				organization: null,
				email: null,
				password: null,
				login: null,
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
            self.setState({ loading: false });
		});
	}

	login() {
		this.setState({ loading: true });
		let errors = this.state.error;
		errors.login = "";
		// Check Email is Valid
		if (validateEmail(this.state.emailAddress) == false) {
			errors.email = "Please enter a valid email address";
		} else {
			errors.email = "";
		}
		if (errors.email == "") {
			const properties = {
				email: this.state.emailAddress,
				password: this.state.password,
				organizationName: this.state.organizationName,
			};
			this.props.login(properties);
			this.setState({ loading: false });
		} else {
			this.setState({ loading: false });
		}
		this.setState({error: errors});
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

		var styleTest = {
			background: "magenta",
			color: "lime",
			fontFamily: "Arial",
			fontSize: "40px"
		};
		const { 
			organizationName,
			organizationValid,
			emailAddress,
			password,
			register,
			loggedIn,
			forgotPassword,
			error,
			disabled
		} = this.state;

		const {
			loginError,
		} = this.props;

		if (register) {
			return <Redirect to='/register'/>;
		}

		if (loggedIn) {
			return <Redirect to='/'/>;
		}

		return <div id="authenticate" className="color-wrap">
			<div className="container">
				<div className="logo">
					<img src={require('../../common/images/logo_text.png')} />
				</div>
				<div className="modal">
					{organizationValid == false && !forgotPassword &&
					<div>
						<div className="organization_input">
							<div className="title">
								<h2>Welcome.</h2>
								<p>Enter your <b>Organization Name</b> to get started.</p>
							</div>
							<input
								type="text"
								name="organizationName"
								value={organizationName}
								onChange={this.changeField}
								placeholder={"Organization Name"}
								disabled={disabled}
							/>
							<span className="address">@activilog</span>
						</div>
						{error.organization && <div className="error">{error.organization}</div>}
						<div>
							<button type="button" className="submit" onClick={this.checkOrganization} disabled={disabled}>Continue</button>
						</div>
					</div>}
					{organizationValid == true && !forgotPassword && <div className="loginform">
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
						{loginError && <div className="error">{loginError}</div>}
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
				</div>
			</div>
			<LoginFooter />
		</div>;
	};
};

Login.propTypes = {
	route: PropTypes.object,
	login: PropTypes.func,
	loginError: PropTypes.string,
};

export default Login;
