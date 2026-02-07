import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Todo.css';
import MoviesPage from './pages/MoviesPage';
import TodoPage from './pages/TodoPage';

const App = () => {
	return (
		<Router>
			<div>
				<nav className="app-nav">
					<NavLink exact to="/" className="nav-link" activeClassName="active">
						Movies
					</NavLink>
					<NavLink to="/todo" className="nav-link" activeClassName="active">
						Todo
					</NavLink>
				</nav>
				<Switch>
					<Route exact path="/" component={MoviesPage} />
					<Route path="/todo" component={TodoPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
