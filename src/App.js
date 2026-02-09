import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieApp from './components/MovieApp';
import TodoPage from './components/TodoPage';

const Navigation = () => {
	const location = useLocation();
	
	return (
		<nav className='navbar navbar-dark bg-dark mb-4'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand'>
					Movie & Todo App
				</Link>
				<div className='navbar-nav flex-row'>
					<Link
						to='/'
						className={`nav-link mr-3 ${location.pathname === '/' ? 'active' : ''}`}
						style={{ color: location.pathname === '/' ? '#fff' : '#6c757d' }}
					>
						Movies
					</Link>
					<Link
						to='/todos'
						className={`nav-link ${location.pathname === '/todos' ? 'active' : ''}`}
						style={{ color: location.pathname === '/todos' ? '#fff' : '#6c757d' }}
					>
						Todos
					</Link>
				</div>
			</div>
		</nav>
	);
};

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Navigation />
				<Switch>
					<Route exact path='/' component={MovieApp} />
					<Route path='/todos' component={TodoPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
