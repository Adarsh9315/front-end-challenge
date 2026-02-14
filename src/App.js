import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import Movies from './pages/Movies';
import Notes from './pages/Notes';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Navigation />
				<Switch>
					<Route exact path='/' component={Movies} />
					<Route path='/notes' component={Notes} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
