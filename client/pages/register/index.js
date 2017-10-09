import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import validateCharacters from '../../common/utilities/validateCharacters';
import validateEmail from '../../common/utilities/validateEmail';

import { check_organization } from '../../api';

import LoginFooter from '../../common/components/LoginFooter';
import Spinner from '../../common/components/Spinner';
require('../../common/styles/style.css');

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organizationName: "",
			organizationValid: false,
			fullName: "",
			emailAddress: "",
			password: "",
			loading: false,
			error: {
				organization: null,
				email: null,
				password: null,
				fullName: null,
				login: null,
			}
		};

		this.register = this.register.bind(this);
		this.changeField = this.changeField.bind(this);
		this.checkOrganization = this.checkOrganization.bind(this);
	}

	componentDidMount() {
		const path = window.location.pathname.toString();

		console.log(path);
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

	register() {
		this.setState({ loading: true });
		let errors = this.state.error;
		errors.login = "";
		errors.password = "";
		errors.organization =  "";
		errors.email = "";
		errors.fullName = "";
		// Check Email is Valid
		if (validateEmail(this.state.emailAddress) == false) {
			errors.email = "Please enter a valid email address";
		} else {
			errors.email = "";
		}
		if (this.state.password.trim() == "") {
			errors.password = "Please enter a password";
		} else {
			errors.password = "";
		}
		if (errors.email == "" && errors.password == "") {
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

	render() {
		const { 
			organizationName,
			organizationValid,
			emailAddress,
			password,
			fullName,
			loading,
			error,
		} = this.state;

		const {
			registerError,
		} = this.props;

		return <div id="authenticate" className="color-wrap">
			<div className="container">
				<div className="logo">
					<img src={require('../../common/images/logo_text.png')} />
				</div>
				<div className="modal">
					<div className="registrationform">
						<div className="title">
							<h2>Account Registration</h2>
						</div>
						<input
							type="text"
							name="fullName"
							value={fullName}
							onChange={this.changeField}
							placeholder={"Full Name"}
							disabled={loading}
						/>
						{error.fullname && <div className="error">{error.fullName}</div>}
						<input
							type="text"
							name="emailAddress"
							value={emailAddress}
							onChange={this.changeField}
							placeholder={"Email Address"}
							disabled={loading}
						/>
						{error.email && <div className="error">{error.email}</div>}
						<input
							type="password"
							name="password"
							value={password}
							onChange={this.changeField}
							placeholder={"Password"}
							disabled={loading}
						/>
						<input
							type="text"
							name="organizationName"
							value={organizationName}
							onChange={this.changeField}
							placeholder={"Organization Name"}
							disabled={loading}
						/>
						{error.email && <div className="error">{error.email}</div>}
						{error.password && <div className="error">{error.password}</div>}
						{registerError && <div className="error">{registerError}</div>}
						<div className="enter">
							<button type="button" className="register" onClick={this.register} disabled={loading}>{loading && <Spinner />}Register</button>
						</div>
					</div>
				</div>
			</div>
			<LoginFooter />
		</div>
	};
};

Register.propTypes = {
	register: PropTypes.func,
	registerError: PropTypes.string,
};

export default Register;
