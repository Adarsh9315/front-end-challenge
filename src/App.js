import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import MovieApp from './MovieApp';

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
