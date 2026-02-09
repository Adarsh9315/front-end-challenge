import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import Movies from './components/Movies';
import Todo from './components/Todo';

const App = () => {
	return (
		<Router>
			<div>
				<Navigation />
				<Switch>
					<Route exact path='/' component={Movies} />
					<Route path='/todo' component={Todo} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
