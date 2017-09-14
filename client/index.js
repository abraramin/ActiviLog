import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ACCOUNT_TYPE } from "./common/config"
import AuthenticatedRoute from "./components/AuthenticatedRoute"

// Load our components
import Dashboard from './components/dashboard/';
import Login from './components/login/';
import Register from './components/register/';
import Publish from './components/publish/';
import Activites from './components/activities/';
import Users from './components/users/';
import MissingPath from './components/MissingPath';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<AuthenticatedRoute
				exact path="/"
				user={null}
				role={[ACCOUNT_TYPE.ADMINISTRATOR, ACCOUNT_TYPE.STUDENT]}
				component={Dashboard}
			/>
			<AuthenticatedRoute
				path="/login"
				user={null}
				role={[ACCOUNT_TYPE.UNREGISTERED]}
				component={Login}
			/>
			<AuthenticatedRoute
				path="/register"
				user={null}
				role={[ACCOUNT_TYPE.UNREGISTERED]}
				component={Register}
			/>
			<AuthenticatedRoute
				path="/publish*"
				user={null}
				role={[ACCOUNT_TYPE.STUDENT]}
				component={Publish}
			/>
			<AuthenticatedRoute
				path="/activites"
				user={null}
				role={[ACCOUNT_TYPE.ADMINISTRATOR]}
				component={Activites}
			/>
			<AuthenticatedRoute
				path="/users"
				user={null}
				role={[ACCOUNT_TYPE.ADMINISTRATOR]}
				component={Users}
			/>
			<AuthenticatedRoute
				path="*"
				user={null}
				role={[ACCOUNT_TYPE.ADMINISTRATOR, ACCOUNT_TYPE.STUDENT, ACCOUNT_TYPE.UNREGISTERED]}
				component={MissingPath}
			/>
		</Switch>
	</BrowserRouter>,
	document.getElementById('app')
);
