import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movies from './components/Movies';
import Notes from './components/Notes';

const Navigation = () => {
	const location = useLocation();
	
	return (
		<nav className='navbar navbar-dark' style={{ backgroundColor: '#1f1f1f', padding: '15px 20px' }}>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand' style={{ fontSize: '1.5rem' }}>
					Movie App
				</Link>
				<div className='navbar-nav flex-row'>
					<Link
						to='/'
						className={`nav-link mr-3 ${location.pathname === '/' ? 'active' : ''}`}
						style={{ color: location.pathname === '/' ? '#fff' : '#aaa' }}
					>
						Movies
					</Link>
					<Link
						to='/notes'
						className={`nav-link ${location.pathname === '/notes' ? 'active' : ''}`}
						style={{ color: location.pathname === '/notes' ? '#fff' : '#aaa' }}
					>
						Notes
					</Link>
				</div>
			</div>
		</nav>
	);
};

const App = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path='/' component={Movies} />
				<Route path='/notes' component={Notes} />
			</Switch>
		</Router>
	);
};

export default App;
