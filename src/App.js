import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviePage from './pages/MoviePage';
import ChessGame from './components/ChessGame';
import NotesPage from './pages/NotesPage';

const App = () => {
	return (
		<Router>
			<div className="app-wrapper">
				<nav className="navigation-bar">
					<div className="nav-container">
						<Link to="/" className="nav-link">Movies</Link>
						<Link to="/chess" className="nav-link">Chess Game</Link>
						<Link to="/notes" className="nav-link">Notes</Link>
					</div>
				</nav>

				<Switch>
					<Route exact path="/" component={MoviePage} />
					<Route path="/chess" component={ChessGame} />
					<Route path="/notes" component={NotesPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
