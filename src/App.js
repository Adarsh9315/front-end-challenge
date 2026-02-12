import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Chess.css';
import LandingPage from './components/LandingPage';
import MovieApp from './components/MovieApp';
import ChessGame from './components/ChessGame';

const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/">
						<LandingPage />
					</Route>
					<Route path="/movies">
						<div>
							<nav className="navigation">
								<ul className="nav-links">
									<li>
										<NavLink exact to="/" activeClassName="active">
											Home
										</NavLink>
									</li>
									<li>
										<NavLink to="/movies" activeClassName="active">
											Movie App
										</NavLink>
									</li>
									<li>
										<NavLink to="/chess" activeClassName="active">
											Chess Game
										</NavLink>
									</li>
								</ul>
							</nav>
							<MovieApp />
						</div>
					</Route>
					<Route path="/chess">
						<div>
							<nav className="navigation">
								<ul className="nav-links">
									<li>
										<NavLink exact to="/" activeClassName="active">
											Home
										</NavLink>
									</li>
									<li>
										<NavLink to="/movies" activeClassName="active">
											Movie App
										</NavLink>
									</li>
									<li>
										<NavLink to="/chess" activeClassName="active">
											Chess Game
										</NavLink>
									</li>
								</ul>
							</nav>
							<ChessGame />
						</div>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
