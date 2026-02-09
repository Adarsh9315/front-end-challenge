import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import MoviesPage from './components/MoviesPage';
import TodoPage from './components/TodoPage';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/' component={MoviesPage} />
				<Route path='/todos' component={TodoPage} />
			</Switch>
		</Router>
	);
};

export default App;
