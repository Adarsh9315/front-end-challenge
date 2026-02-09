import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieApp from './components/MovieApp';
import TodoPage from './components/TodoPage';

const App = () => {
	return (
		<Router>
			<div className="app-wrapper">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="container-fluid">
						<Link className="navbar-brand" to="/">OMDB App</Link>
						<div className="navbar-nav">
							<Link className="nav-link" to="/">Movies</Link>
							<Link className="nav-link" to="/todos">Todo List</Link>
						</div>
					</div>
				</nav>
				<Switch>
					<Route exact path="/" component={MovieApp} />
					<Route path="/todos" component={TodoPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
