import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ACCOUNT_TYPE } from "./common/config"
import RedirectRoute from "./pages/RedirectRoute"

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

User.loadUser();

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<RedirectRoute
				exact path="/"
				user={User}
				render={(props) => <Dashboard user={User} />}
			/>
			<RedirectRoute
				path="/login"
				user={User}
				render={(props) => <Login user={User} />}
			/>
			<RedirectRoute
				path="/register"
				user={User}
				render={(props) => <Register user={User} />}
			/>
			<RedirectRoute
				path="/publish*"
				user={User}
				render={(props) => <Publish user={User} />}
			/>
			<RedirectRoute
				path="/activites"
				user={User}
				render={(props) => <Activities user={User} />}
			/>
			<RedirectRoute
				path="/users"
				user={User}
				render={(props) => <Users user={User} />}
			/>
			<RedirectRoute
				path="*"
				user={User}
				component={MissingPath}
			/>
		</Switch>
	</BrowserRouter>,
	document.getElementById('app')
);
