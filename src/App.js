import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import './App.css';

const App = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/todo' component={TodoPage} />
			</Switch>
		</Router>
	);
};

export default App;
