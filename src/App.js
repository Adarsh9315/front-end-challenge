import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MovieShowdownApp from './components/MovieShowdownApp';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/app" component={MovieShowdownApp} />
				<Redirect to="/" />
			</Switch>
		</Router>
	);
};

export default App;
