import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<LandingPage />
				</Route>
				<Route path='/app'>
					<MainApp />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
