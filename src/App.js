import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/app' component={MainApp} />
			</Switch>
		</Router>
	);
};

export default App;
