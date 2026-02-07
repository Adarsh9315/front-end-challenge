import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import MoviesPage from './pages/MoviesPage';
import TodoPage from './pages/TodoPage';

const App = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path='/' component={MoviesPage} />
				<Route path='/todos' component={TodoPage} />
			</Switch>
		</Router>
	);
};

export default App;
