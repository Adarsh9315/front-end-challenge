import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LandingPage from './components/LandingPage';
import MoviePage from './components/MoviePage';

const App = () => {
	return (
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route path="/app" component={MoviePage} />
		</Switch>
	);
};

export default App;
