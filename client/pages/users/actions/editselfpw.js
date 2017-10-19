import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import { reset_self_password } from '../../../api';
import {notify} from 'react-notify-toast';

import validatePassword from '../../../common/utilities/validatePassword';
import Spinner from '../../../common/components/Spinner';

class EditUserSPW extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			password: "",
			newpassword: "",
      		confpassword: "",
			loading: false,
			deleting: false,
			saving: false,
			error: {
				password: null,
				newPassword: null,
				confirmPassword: null,
				generic: null,
			}
		};

		this.editPassword = this.editPassword.bind(this);
		this.changeField = this.changeField.bind(this);
	}


	editPassword() {
		this.setState({ loading: true, saving: true });
		let errors = this.state.error;
		errors.password = "";
		errors.newPassword = "";
 		errors.confirmPassword = "";
		errors.generic = "";

    // Check fields are not empty
		if (this.state.password.trim() == "") {
			errors.password = "Please enter your current password.";
		} else {
			errors.password = "";
		}
		if (this.state.newpassword.trim() == "") {
			errors.newPassword = "Please enter the new password.";
		} else {
			errors.newPassword = "";
		}
		if (this.state.confpassword.trim() == "") {
			errors.confirmPassword = "Please retype the new password.";
		} else {
			errors.confirmPassword = "";
		}
		if (validatePassword(this.state.newpassword) == false) {
			errors.newPassword = "Invalid password! Password to be of at least 8 characters including a number and an uppercase letter.";
		} else {
			errors.password = "";
		}
    	if(this.state.newpassword.trim() !== this.state.confpassword.trim())
    	{
      		errors.confirmPassword = "The two entered passwords don't match!"
    	}

		// Attempt save to database
		if (errors.newPassword === "" && errors.confirmPassword === "" && errors.password === "") 
		{
			console.log("attempting to save...")
			let self = this;
			reset_self_password(this.state.password, this.state.newpassword).then(response => response.json()).then(function(result) {
				if (result.success == true) {
					notify.show('Password has been successfully updated');
					self.props.history.push("/users");
				} else {
          			notify.show('Sorry, something went wrong :/');
          			console.log("here");
					self.setState({ loading: false, saving: false, error: {generic: "Sorry, something went wrong and we could not save your changes :/. Please refresh the page and try again."} });
				}
			});
		} else {
			this.setState({ loading: false, saving: false });
		}
		this.setState({error: errors});
	}

	changeField(evt) {
		this.setState({[evt.target.name]: evt.target.value});
	}

	render() {
		const {
			password,
			confpassword,
			newpassword,
			error,
			loading,
			saving,
			deleting,
		} = this.state;

    	const {
			user,
		} = this.props;

		return <div className="page">
			<div className="box">
					<div className="title">
                  		<p><img src={require('../../../common/images/go_back.png')} onClick={() => this.props.history.push("/users")}/> &nbsp; Reset Your Password</p>
         			</div>
					<div className="components">
						<div className="input">
							<label>Current Password</label>
								<input
								name="password"
                				type="password"
								value={password}
								onChange={this.changeField}
								disabled={loading}
						    />
							{error.password && <div className="error">{error.password}</div>}
						</div>
						<div className="input">
							<label>New Password</label>
							<input
								name="newpassword"
                				type="password"
								value={newpassword}
								onChange={this.changeField}
								disabled={loading}
							/>
							{error.newPassword && <div className="error">{error.newPassword}</div>}
						</div>
						<div className="input">
							<label>Confirm New Password</label>
							<input
								type="password"
								name="confpassword"
								value={confpassword}
								onChange={this.changeField}
								disabled={loading}
							/>
							{error.confirmPassword && <div className="error">{error.confirmPassword}</div>}
						</div>
						{error.generic && <div className="error">{error.generic}</div>}
						<div>
							<button type="button" className="submit width60 float-right" onClick={this.editPassword} disabled={loading}>{saving && <Spinner />}Update User Info</button>
					</div>
          </div>
			</div>
		</div>;
	};
};

EditUserSPW.propTypes = {
	user: PropTypes.object,
};

export default withRouter(EditUserSPW);
