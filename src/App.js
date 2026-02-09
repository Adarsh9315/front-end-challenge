import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieApp from './MovieApp';
import ChessGame from './components/ChessGame';

const App = () => {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2a2a2a', marginBottom: '20px' }}>
					<div className="container-fluid">
						<Link className="navbar-brand" to="/">My App</Link>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="nav-link" to="/">Movies</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/chess">Chess Game</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<Switch>
					<Route exact path="/" component={MovieApp} />
					<Route path="/chess" component={ChessGame} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
