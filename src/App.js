import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AboutUs from './components/AboutUs';

const App = () => {
	return (
		<Router>
			<div className='app-wrapper'>
				<Navigation />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/about' component={AboutUs} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
