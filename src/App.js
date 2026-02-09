import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import MoviesPage from './pages/MoviesPage';
import TodoPage from './pages/TodoPage';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Navigation />
				<Switch>
					<Route exact path='/' component={MoviesPage} />
					<Route path='/todo' component={TodoPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
