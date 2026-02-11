import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TournamentLanding from './pages/TournamentLanding';
import MoviePage from './pages/MoviePage';
import ChessGame from './components/ChessGame';

const App = () => {
	return (
		<Router>
			<div className="app-wrapper">
				<nav className="navigation-bar">
					<div className="nav-container">
						<Link to="/" className="nav-link">Tournament</Link>
						<Link to="/movies" className="nav-link">Movies</Link>
						<Link to="/chess" className="nav-link">Chess Game</Link>
					</div>
				</nav>

				<Switch>
					<Route exact path="/" component={TournamentLanding} />
					<Route path="/movies" component={MoviePage} />
					<Route path="/chess" component={ChessGame} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
