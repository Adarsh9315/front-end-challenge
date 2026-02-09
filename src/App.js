import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MovieSearch from './components/MovieSearch';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/movies' component={MovieSearch} />
			</Switch>
		</Router>
	);
};

export default App;
