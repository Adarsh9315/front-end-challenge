import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import MoviePage from './pages/MoviePage';
import TodoPage from './components/TodoPage';

const App = () => {
	return (
		<Router>
			<div className='landing-page'>
				<Navigation />
				<Switch>
					<Route exact path='/' component={MoviePage} />
					<Route path='/todos' component={TodoPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
