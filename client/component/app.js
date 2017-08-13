import React from 'react';

const element = (
		<div>
			<input type="checkbox" name="reactcheck" value="React" checked />React
		</div>
)

export default class App extends React.Component
{
	render(){
		return element;
	}
}
