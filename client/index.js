import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ACCOUNT_TYPE } from "./common/config"
import AuthenticatedRoute from "./pages/AuthenticatedRoute"

// Load our User Object
import User from "./common/models/User"

// Load our components
import Dashboard from './pages/dashboard/';
import Login from './pages/login/';
import Register from './pages/register/';
import Publish from './pages/publish/';
import Activites from './pages/activities/';
import Users from './pages/users/';
import MissingPath from './pages/MissingPath';

// Fetch currently logged in User
User.load();

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<AuthenticatedRoute
				exact path="/"
				user={User}
				role={[ACCOUNT_TYPE.ADMINISTRATOR, ACCOUNT_TYPE.STUDENT]}
				render={(props) => <Dashboard user={User} />}
			/>
			<AuthenticatedRoute
				path="/login"
				user={User}
				role={[ACCOUNT_TYPE.UNREGISTERED]}
				render={(props) => <Login user={User} />}
			/>
			<AuthenticatedRoute
				path="/register"
				user={User}
				role={[ACCOUNT_TYPE.UNREGISTERED]}
				render={(props) => <Register user={User} />}
			/>
			<AuthenticatedRoute
				path="/publish*"
				user={User}
				role={[ACCOUNT_TYPE.STUDENT]}
				render={(props) => <Publish user={User} />}
			/>
			<AuthenticatedRoute
				path="/activites"
				user={User}
				role={[ACCOUNT_TYPE.ADMINISTRATOR]}
				render={(props) => <Activities user={User} />}
			/>
			<AuthenticatedRoute
				path="/users"
				user={User}
				role={[ACCOUNT_TYPE.ADMINISTRATOR]}
				render={(props) => <Users user={User} />}
			/>
			<AuthenticatedRoute
				path="*"
				user={User}
				role={[ACCOUNT_TYPE.ADMINISTRATOR, ACCOUNT_TYPE.STUDENT, ACCOUNT_TYPE.UNREGISTERED]}
				component={MissingPath}
			/>
		</Switch>
	</BrowserRouter>,
	document.getElementById('app')
);
