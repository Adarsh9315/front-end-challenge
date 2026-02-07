import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import TodoPage from './pages/TodoPage';

const App = () => {
	return (
		<Router>
			<div className='app-shell'>
				<nav className='app-nav'>
					<div className='container d-flex align-items-center'>
						<NavLink exact to='/' className='app-link'>
							Movies
						</NavLink>
						<NavLink to='/todos' className='app-link'>
							Todos
						</NavLink>
					</div>
				</nav>
				<Switch>
					<Route exact path='/' component={MoviePage} />
					<Route path='/todos' component={TodoPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
