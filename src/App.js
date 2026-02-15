import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movies from './components/Movies';
import Notes from './components/Notes';

const App = () => {
	return (
		<Router>
			<div>
				<nav className="navbar">
					<div className="nav-container">
						<Link to="/" className="nav-link">Movies</Link>
						<Link to="/notes" className="nav-link">Notes</Link>
					</div>
				</nav>

				<Switch>
					<Route exact path="/" component={Movies} />
					<Route path="/notes" component={Notes} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
