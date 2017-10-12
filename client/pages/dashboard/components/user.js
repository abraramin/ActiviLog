import React from "react";
import PropTypes from "prop-types";
import Collapsible from "react-collapsible";

import Loading from "../../../common/components/Loading";
import List from "../../../common/components/List";
import { fetchPosts } from '../../../api';

class User extends React.Component {
	constructor(props) {
		super(props);
		
		this.loadPosts = this.loadPosts.bind(this);
	}
	
	componentDidMount() {
		this.loadPosts();		
	}
	
	loadPosts() {
		this.setState({loading: true});
		
		//Get user post data
		let self = this;
		const load = fetchPosts(this.props.user.id).then(function(response) {
			if (response.status == 200) {
				return response.json();
			} else {
			return false;
			}
		}).then(function(result) {
			if (result && result.success == true) {
				postData.title = result.posts.title;
				postData.desc = result.post.desc;
				postData.startTime = result.posts.startTime;
				postData.endTime = result.posts.endTime;

				self.setState({posts: postData, loading: false});
			} else {				
				self.setState({loading: false,});
			}
		});
	}
	
	render() {
		const {
			user, 
		} = this.props;  
		
		return <div className="page">
			<div className="welcome">
				Welcome <strong>{user.fullName}</strong>
			</div>
			<div className="list-container">
				<List list={["Act1","Act2","Act3"]} />
				//Post Data as prop
				//this.state.postData
			</div>
		</div>;
	};
};

User.propTypes = {
	user: PropTypes.object,
};

export default User;
