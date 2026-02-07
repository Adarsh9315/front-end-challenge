import React from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesPage from './pages/MoviesPage';
import TodoPage from './pages/TodoPage';

const App = () => {
	const location = useLocation();

	return (
		<div>
			{/* Navigation */}
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">Movie App</Link>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link 
								className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
								to="/"
							>
								Movies
							</Link>
						</li>
						<li className="nav-item">
							<Link 
								className={`nav-link ${location.pathname === '/todo' ? 'active' : ''}`} 
								to="/todo"
							>
								Todo
							</Link>
						</li>
					</ul>
				</div>
			</nav>

			{/* Routes */}
			<Switch>
				<Route exact path="/" component={MoviesPage} />
				<Route path="/todo" component={TodoPage} />
			</Switch>
		</div>
	);
};

export default App;
