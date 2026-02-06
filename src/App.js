import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviePage from './components/MoviePage';
import ChessGame from './components/ChessGame';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MoviePage />} />
			<Route path="/chess" element={<ChessGame />} />
		</Routes>
	);
};

export default App;