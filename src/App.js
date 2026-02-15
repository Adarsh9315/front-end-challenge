import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Map from './components/Map';

const App = () => {
	return (
		<Router>
			<div>
				<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
					<div className='container-fluid'>
						<Link className='navbar-brand' to='/'>Movie App</Link>
						<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='navbarNav'>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<Link className='nav-link' to='/'>Home</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/map'>Map</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/map' component={Map} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
