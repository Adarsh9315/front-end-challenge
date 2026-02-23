import React, { useState, useEffect, useCallback, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import TodoPage from './components/TodoPage';
import Loader from './components/Loader';
import { useSnackbar } from 'react-simple-snackbar'

const App = () => {
	const [currentPage, setCurrentPage] = useState('movies');
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [openSnackbar] = useSnackbar()

	// Debounce search input
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchValue(searchValue);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchValue]);

	const getMovieRequest = useCallback(async (searchValue) => {
		if (!searchValue) {
			setMovies([]);
			return;
		}

		setLoading(true);
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a21d8f2b`;

		try {
			const response = await fetch(url);
			const responseJson = await response.json();

			if (responseJson.Search) {
				setMovies(responseJson.Search);
			} else {
				setMovies([]);
			}
		} catch (error) {
			setMovies([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getMovieRequest(debouncedSearchValue);
	}, [debouncedSearchValue, getMovieRequest]);

	useEffect(() => {
		try {
			const savedNominations = localStorage.getItem('nominations');
			if (savedNominations) {
				const movieNomination = JSON.parse(savedNominations);
				if (movieNomination) {
					setNomination(movieNomination);
				}
			}
		} catch (error) {
			console.error('Error loading nominations from localStorage:', error);
		}
	}, []);

	const saveToLocalStorage = useCallback((items) => {
		try {
			localStorage.setItem('nominations', JSON.stringify(items));
		} catch (error) {
			console.error('Error saving nominations to localStorage:', error);
		}
	}, []);

	const addNominationMovie = useCallback((movie) => {
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
	}, [nomination, openSnackbar, saveToLocalStorage]);

	const removeNominationMovie = useCallback((movie) => {
		const newNominationList = nomination.filter(
			(nomination) => nomination.imdbID !== movie.imdbID
		);

		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
	}, [nomination, saveToLocalStorage]);

	const isNominationsFull = useMemo(() => {
		return nomination.length === 5;
	}, [nomination]);

	return (
		<div>
			<nav className='navigation-bar' role='navigation' aria-label='Main navigation'>
				<button
					className={`nav-btn ${currentPage === 'movies' ? 'active' : ''}`}
					onClick={() => setCurrentPage('movies')}
					aria-label='Movies page'
					aria-current={currentPage === 'movies' ? 'page' : undefined}
				>
					Movies
				</button>
				<button
					className={`nav-btn ${currentPage === 'todos' ? 'active' : ''}`}
					onClick={() => setCurrentPage('todos')}
					aria-label='Todos page'
					aria-current={currentPage === 'todos' ? 'page' : undefined}
				>
					Todos
				</button>
			</nav>

			{currentPage === 'movies' ? (
				<div className='container-fluid movie-app'>
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Movies' />
						<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</div>
					{isNominationsFull && (
						<div className='banner'>
							All 5 nominations are done
						</div>
					)}
					{loading ? (
						<Loader />
					) : (
						<div className='row'>
							<MovieList
								movies={movies}
								handleNominationClick={addNominationMovie}
								nominationComponent={AddNomination}
							/>
						</div>
					)}
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
			) : (
				<TodoPage />
			)}
		</div>
	);
};

export default App;
