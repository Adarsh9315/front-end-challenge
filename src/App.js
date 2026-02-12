import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import MovieApp from './components/MovieApp';
import TodoPage from './components/TodoPage';

const App = () => {
	return (
		<Router>
			<div className='app-container'>
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
