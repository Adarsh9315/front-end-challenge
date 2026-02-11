import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import ChessGame from './components/ChessGame';
import TodoPage from './components/TodoPage';
import { useSnackbar } from 'react-simple-snackbar'

const App = () => {
	const [currentPage, setCurrentPage] = useState('movies');
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [openSnackbar] = useSnackbar()

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a21d8f2b`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieNomination = JSON.parse(
			localStorage.getItem('nominations')
		);

		if (movieNomination) {
			setNomination(movieNomination);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('nominations', JSON.stringify(items));
	};

	const addNominationMovie = (movie) => {
		let savedNominations = localStorage.getItem('nominations');
		if (savedNominations) {
			savedNominations = JSON.parse(savedNominations);
			if (savedNominations.length === 5) {
				openSnackbar('Only 5 nominations are allowed per user')
				return;
			}

			let obj = savedNominations.find(o => o.imdbID === movie.imdbID);
			if (!obj) {
				const newNominationList = [...nomination, movie];
				setNomination(newNominationList);
				saveToLocalStorage(newNominationList);
			}
		}else{
			const newNominationList = [...nomination, movie];
			setNomination(newNominationList);
			saveToLocalStorage(newNominationList);
		}
	};

	const removeNominationMovie = (movie) => {
		const newNominationList = nomination.filter(
			(nomination) => nomination.imdbID !== movie.imdbID
		);

		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
	};

	return (
		<div>
			{/* Navigation Bar */}
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<span className="navbar-brand">My App</span>
					<div className="navbar-nav">
						<button 
							className={`nav-link btn btn-link ${currentPage === 'movies' ? 'active' : ''}`}
							onClick={() => setCurrentPage('movies')}
						>
							Movies
						</button>
						<button 
							className={`nav-link btn btn-link ${currentPage === 'chess' ? 'active' : ''}`}
							onClick={() => setCurrentPage('chess')}
						>
							Chess Game
						</button>
						<button 
							className={`nav-link btn btn-link ${currentPage === 'todo' ? 'active' : ''}`}
							onClick={() => setCurrentPage('todo')}
						>
							Todo
						</button>
					</div>
				</div>
			</nav>

			{/* Conditional Rendering based on current page */}
			{currentPage === 'movies' ? (
				<div className='container-fluid movie-app'>
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Movies' />
						<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</div>
					<div className='banner' style={{display: JSON.parse(localStorage.getItem('nominations')).length === 5 ? 'block' : 'none'}}>
						All 5 nominations are done
					</div>
					<div className='row'>
						<MovieList
							movies={movies}
							handleNominationClick={addNominationMovie}
							nominationComponent={AddNomination}
						/>
					</div>
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Nominations' />
					</div>
					<div className='row'>
						<MovieList
							movies={nomination}
							handleNominationClick={removeNominationMovie}
							nominationComponent={RemoveNominations}
						/>
					</div>
				</div>
			) : currentPage === 'chess' ? (
				<ChessGame />
			) : (
				<TodoPage />
			)}
		</div>
	);
};

export default App;
