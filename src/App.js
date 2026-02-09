import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesPage from './pages/MoviesPage';
import TodoPage from './pages/TodoPage';

const App = () => {
	return (
		<Router>
			<div>
				<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
					<div className='container-fluid'>
						<Link className='navbar-brand' to='/'>Movie App</Link>
						<div className='navbar-nav'>
							<Link className='nav-link' to='/'>Movies</Link>
							<Link className='nav-link' to='/todos'>Todos</Link>
						</div>
					</div>
				</nav>

				<Switch>
					<Route exact path='/' component={MoviesPage} />
					<Route path='/todos' component={TodoPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
