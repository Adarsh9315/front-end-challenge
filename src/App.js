import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MovieApp from './components/MovieApp';

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
