import React from "react";
import Collapsible from "react-collapsible"; 
import {withRouter} from "react-router-dom";
import _ from 'lodash';
import moment from 'moment';

class List extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: false,
			error: false,
			posts: [],
		}
		
		this.sortPosts = this.sortPosts.bind(this);
	}
	
	//sort by date and save the posts in sorted.
	sortPosts() {	
		this.setState({loading: true});
		
		var data = this.props.posts;
		var sorted = _.groupBy(data, function(item) {
			const dateString = moment(item.date).format('dddd, DD MMM');
			return dateString;
		});
		
		{Object.keys(sorted).map((i) => {
			sorted[i] = _.sortBy(sorted[i], function(item) {
				return (item.startTime);
			});
		})}
		
		this.setState({loading: false, posts: sorted});
	}
	
	componentDidMount() {
		this.sortPosts();		
	}
	
	render() {
		const {
			loading,
			error,
			posts,
		} = this.state;

		return <div>
			{Object.keys(this.state.posts).map((e) => {
				return <div className="box">
					<div className="header">
						{e}
					</div>
					<table>
						<tbody>
							{this.state.posts[e] != null && this.state.posts[e].map((item, i) => {
								return <tr key={i} onClick={() => this.props.history.push("/edit/" + item.id)}
									style={{ "cursor" : "pointer" }}>
									<th style={{ "width" : "14%" }}>{moment(item.startTime).format("h:mm a")}</th>
									<th style={{"background": item.color }}>
										<strong>{item.title}</strong> : {item.desc}
									</th>
								</tr>
							})}
						</tbody>
					</table>
				</div>
			})}
		</div>
	};
};

export default withRouter(List);
