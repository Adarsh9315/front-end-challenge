import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieApp from './components/MovieApp';
import TicTacToe from './components/TicTacToe';

const App = () => {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="container-fluid">
						<Link className="navbar-brand" to="/">Movie App</Link>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="nav-link" to="/">Movies</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/tictactoe">Tic Tac Toe</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<Routes>
					<Route path="/" element={<MovieApp />} />
					<Route path="/tictactoe" element={<TicTacToe />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
