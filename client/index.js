import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';
import App from './components/app.js';
import About from './components/about.js';
//import {browserHistory} from 'react-history';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route path="/" component={App}/>
			<Route path="/about" component={About}/>
		</div>
	</BrowserRouter>,
	document.getElementById('app')
);



