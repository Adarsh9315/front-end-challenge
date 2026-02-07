import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MovieApp from './components/MovieApp';
import ChessGame from './components/ChessGame';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
					<div className="container-fluid">
						<Link to="/" className="navbar-brand">My App</Link>
						<div className="collapse navbar-collapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<Link to="/movies" className="nav-link">Movies</Link>
								</li>
								<li className="nav-item">
									<Link to="/chess" className="nav-link">Chess Game</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<Switch>
					<Route exact path={["/", "/movies"]}>
						<MovieApp />
					</Route>
					<Route path="/chess">
						<ChessGame />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
