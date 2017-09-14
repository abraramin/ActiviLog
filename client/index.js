import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { ACCOUNT_TYPE } from "./common/Config"
import AuthenticatedRoute from "./components/AuthenticatedRoute"

// Load our components
import Dashboard from './components/dashboard/';

ReactDOM.render(
	<BrowserRouter>
			<AuthenticatedRoute
				path="/"
				//anyRole={[ACCOUNT_TYPE.ADMINISTRATOR, ACCOUNT_TYPE.SUPERVISOR, ACCOUNT_TYPE.STUDENT]}
				component={Dashboard}
			/>
	</BrowserRouter>,
	document.getElementById('app')
);
