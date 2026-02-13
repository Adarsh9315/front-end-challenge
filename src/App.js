import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieApp from './components/MovieApp';
import Notes from './components/Notes';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={MovieApp} />
				<Route path='/notes' component={Notes} />
			</Switch>
		</Router>
	);
};

export default App;
