import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ACCOUNT_TYPE } from "./common/config"
import AuthenticatedRoute from "./pages/AuthenticatedRoute"

// Load our components
import Dashboard from './pages/dashboard/';
import Login from './pages/login/';
import Register from './pages/register/';
import Publish from './pages/publish/';
import Activites from './pages/activities/';
import Users from './pages/users/';
import MissingPath from './pages/MissingPath';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<AuthenticatedRoute
				exact path="/"
				user={window.account}
				role={[ACCOUNT_TYPE.ADMINISTRATOR, ACCOUNT_TYPE.STUDENT]}
				component={Dashboard}
			/>
			<AuthenticatedRoute
				path="/login"
				user={window.account}
				role={[ACCOUNT_TYPE.UNREGISTERED]}
				component={Login}
			/>
			<AuthenticatedRoute
				path="/register"
				user={window.account}
				role={[ACCOUNT_TYPE.UNREGISTERED]}
				component={Register}
			/>
			<AuthenticatedRoute
				path="/publish*"
				user={window.account}
				role={[ACCOUNT_TYPE.STUDENT]}
				component={Publish}
			/>
			<AuthenticatedRoute
				path="/activites"
				user={window.account}
				role={[ACCOUNT_TYPE.ADMINISTRATOR]}
				component={Activites}
			/>
			<AuthenticatedRoute
				path="/users"
				user={window.account}
				role={[ACCOUNT_TYPE.ADMINISTRATOR]}
				component={Users}
			/>
			<AuthenticatedRoute
				path="*"
				user={window.account}
				role={[ACCOUNT_TYPE.ADMINISTRATOR, ACCOUNT_TYPE.STUDENT, ACCOUNT_TYPE.UNREGISTERED]}
				component={MissingPath}
			/>
		</Switch>
	</BrowserRouter>,
	document.getElementById('app')
);
