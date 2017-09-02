import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';

class App extends React.Component {
   render(){
	   return <div><h1>hi</h1></div>
   }
}

render(
		<Router>
			<Route path="/" component={App}/>
		</Router>,
		document.getElementById('app')
	);