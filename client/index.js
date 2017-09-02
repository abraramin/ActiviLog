import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';
//import {browserHistory} from 'react-history';

export class App extends React.Component {
   render(){
	   return <div><h1>hi</h1></div>
   }
}

ReactDOM.render(
	<BrowserRouter>
		<Route path="/" component={App}/>
	</BrowserRouter>,
	document.getElementById('app')
);

export default App;