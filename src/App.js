import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Chess.css';
import './Todo.css';
import MovieApp from './components/MovieApp';
import ChessGame from './components/ChessGame';
import TodoApp from './components/TodoApp';

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
							<NavLink to="/todo" activeClassName="active">
								Todo List
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
					<Route path="/todo">
						<TodoApp />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
