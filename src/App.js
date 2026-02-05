import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import MovieApp from './components/MovieApp';
import ChessGame from './components/ChessGame';

const App = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path='/' component={MovieApp} />
				<Route path='/chess' component={ChessGame} />
			</Switch>
		</Router>
	);
};

export default App;
