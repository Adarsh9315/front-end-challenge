import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movies from './components/Movies';
import Todo from './components/Todo';

const App = () => {
	return (
		<Router>
			<div>
				<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
					<div className='container-fluid'>
						<Link className='navbar-brand' to='/'>
							Movie App
						</Link>
						<button
							className='navbar-toggler'
							type='button'
							data-toggle='collapse'
							data-target='#navbarNav'
							aria-controls='navbarNav'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='navbarNav'>
							<ul className='navbar-nav ml-auto'>
								<li className='nav-item'>
									<Link className='nav-link' to='/'>
										Movies
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/todo'>
										Todo
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<Switch>
					<Route exact path='/' component={Movies} />
					<Route path='/todo' component={Todo} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
