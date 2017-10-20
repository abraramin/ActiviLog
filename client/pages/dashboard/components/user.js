import React from "react";
import PropTypes from "prop-types";
import Collapsible from "react-collapsible";

import InnerLoader from '../../../common/components/InnerLoader';
import Pagination from '../../../common/components/Pagination';
import List from "../../../common/components/List";
import { fetchPosts } from '../../../api';

class User extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			postData: null,
			error: false,
			openAll: true,
			page: 1,
			pageItems: 50,
			totalResults: 0,
		}
		
		this.loadPosts = this.loadPosts.bind(this);
		this.openClose = this.openClose.bind(this);
		this.changePage = this.changePage.bind(this);
	}
	
	componentDidMount() {
		this.loadPosts(this.state.page, this.state.pageItems);		
	}

	changePage(direction) {
		if (direction == "forward") {
			const page = this.state.page + 1;
			this.loadPosts(page, this.state.pageItems);
		} else {
			const page = this.state.page - 1;
			this.loadPosts(page, this.state.pageItems);
		}
	}
	
	openClose() {
		if(this.state.openAll) {
			this.setState({openAll: false});
		}
		else {
			this.setState({openAll: true});
		}
	}
	
	loadPosts(page, pageItems) {
		let self = this;
		this.setState({loading: true});
		
		//Get user post data
		fetchPosts(this.props.user.id, page, pageItems).then(response => response.json()).then(function(result) {
			if (result.success == true) {
				let postData = [];
				
				result.posts.map(function(post) {
					
					const values = {
						id: post.id,
						title: post.title,
						desc: post.desc,
						startTime: new Date(post.startTime),
						endTime: new Date(post.endTime),
						date: new Date(post.startTime),
						color: post.color,
					}
					return postData.push(values);
				});
				if (postData.length == 0) {
					postData = null;
				}
				self.setState({postData: postData, loading: false, page: result.page, totalResults: result.total});
			} else {				
				self.setState({loading: false, postData: null, error: true});
			}
		});
	}
	
	render() {
		const {
			loading,
			postData,
			error,
			openAll,
		} = this.state;  
		
		return <div className="page">
			{loading && <InnerLoader />}

			{!loading && error && <div className="error text-align-center">
				<img src={require('../../../common/images/info.png')} />
				<p>There was an error loading the posts. Please refresh the page and try again.</p>
			</div>}
			
			{!loading && !error && postData == null && <div className="text-align-center">
				<img src={require('../../../common/images/info.png')} />
				<p>No posts were found. Click publish to get started.</p>
			</div>}
			
			{!loading && !error && postData != null && <div>
				<List posts={this.state.postData} openAll={this.state.openAll} />
				<Pagination page={this.state.page} pageItems={this.state.pageItems} totalResults={this.state.totalResults} changePage={this.changePage} disabled={loading} />
			</div>}
		</div>;
	};
};

User.propTypes = {
	user: PropTypes.object,
};

export default User;
