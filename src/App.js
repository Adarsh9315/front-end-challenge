import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieApp from './MovieApp';
import ChessGame from './components/ChessGame';
import LandingPage from './components/LandingPage';

const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/movies" component={MovieApp} />
					<Route path="/chess" component={ChessGame} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
