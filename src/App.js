import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieApp from './MovieApp';
import LandingPage from './components/LandingPage';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/app" component={MovieApp} />
			</Switch>
		</Router>
	);
};

export default App;
