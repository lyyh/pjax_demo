import React from 'react';

	let Footer = (props) => 
	(
		<div className='comment-footer'>
			<Btn name='1' pjaxhref='/comment?doc=Node如何入门.md'/>
			<Btn name='2' pjaxhref='/comment?doc=h5_history.md'/>
			<Btn name='3' pjaxhref='/comment?doc=react.md'/>
			<Btn name='4' pjaxhref='/comment?doc=url_history.md'/>
			<Btn name='5' pjaxhref='/comment?doc=webpack.md'/>
		</div>
	)

	let Btn = (props) => <div className='comment-btn' data-coffce-pjax-href={props.pjaxhref} data-coffce-pjax="pjax">{props.name}</div>
	export default Footer