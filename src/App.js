import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import MovieShowdown from './components/MovieShowdown';

const App = () => {
	return (
		<Router>
			<nav className='navbar navbar-dark bg-dark'>
				<div className='container-fluid'>
					<Link to='/' className='navbar-brand'>
						Movie App
					</Link>
					<div className='navbar-nav flex-row'>
						<Link to='/' className='nav-link me-3'>
							Home
						</Link>
						<Link to='/showdown' className='nav-link'>
							Showdown
						</Link>
					</div>
				</div>
			</nav>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/showdown' component={MovieShowdown} />
			</Switch>
		</Router>
	);
};

export default App;
