import React from 'react';
import CommentBody from '../components/comment/CommentBody.jsx';
import CommentFooter from '../components/comment/CommentFooter.jsx';
import CommentHeader from '../components/comment/CommentHeader.jsx';
import {updatePage} from '../actions/index-action';

let Comment = React.createClass({
	componentDidMount() {
	      updatePage()
	},
	render(){
		return (
			<div className='comment'>
				<CommentHeader title='我的评论区'/>
				<CommentBody/>
				<CommentFooter/>
			</div>
		)
	}
})

export default Comment 