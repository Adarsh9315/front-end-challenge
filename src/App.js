import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import MoviesPage from './components/MoviesPage';
import TodoPage from './components/TodoPage';

const App = () => {
	return (
		<Router>
			<div className='app-wrapper'>
				<Navigation />
				<Switch>
					<Route exact path='/' component={MoviesPage} />
					<Route path='/todos' component={TodoPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
