import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieApp from './components/MovieApp';
import ChessGame from './components/ChessGame';

const NavBar = () => {
	const location = useLocation();

	return (
		<nav className="app-nav">
			<div className="app-nav-inner">
				<Link
					to="/"
					className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
				>
					Movies
				</Link>
				<Link
					to="/chess"
					className={`nav-link-item ${location.pathname === '/chess' ? 'active' : ''}`}
				>
					Chess
				</Link>
			</div>
		</nav>
	);
};

const App = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path="/" component={MovieApp} />
				<Route path="/chess" component={ChessGame} />
			</Switch>
		</Router>
	);
};

export default App;
