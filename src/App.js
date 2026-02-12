import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Chess.css';
import MovieApp from './components/MovieApp';
import ChessGame from './components/ChessGame';
import NoteTaking from './components/NoteTaking';

const App = () => {
	return (
		<Router>
			<div>
				<nav className="navigation">
					<ul className="nav-links">
						<li>
							<NavLink exact to="/" activeClassName="active">
								Movie App
							</NavLink>
						</li>
						<li>
							<NavLink to="/chess" activeClassName="active">
								Chess Game
							</NavLink>
						</li>
						<li>
							<NavLink to="/notes" activeClassName="active">
								Notes
							</NavLink>
						</li>
					</ul>
				</nav>
				
				<Switch>
					<Route exact path="/">
						<MovieApp />
					</Route>
					<Route path="/chess">
						<ChessGame />
					</Route>
					<Route path="/notes">
						<NoteTaking />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
