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
	const [error, setError] = useState(null);
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
			setError(null);
			return;
		}

		setLoading(true);
		setError(null);
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a21d8f2b`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Failed to fetch movies');
			}
			const responseJson = await response.json();

			if (responseJson.Search) {
				setMovies(responseJson.Search);
			} else {
				setMovies([]);
				if (responseJson.Error) {
					setError(responseJson.Error);
				}
			}
		} catch (error) {
			setMovies([]);
			setError('Failed to load movies. Please try again.');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getMovieRequest(debouncedSearchValue);
	}, [debouncedSearchValue, getMovieRequest]);

	useEffect(() => {
		try {
			const movieNomination = JSON.parse(
				localStorage.getItem('nominations') || '[]'
			);

			if (movieNomination && Array.isArray(movieNomination)) {
				setNomination(movieNomination);
			}
		} catch (error) {
			console.error('Error loading nominations from localStorage:', error);
			setNomination([]);
		}
	}, []);

	const saveToLocalStorage = useCallback((items) => {
		try {
			localStorage.setItem('nominations', JSON.stringify(items));
		} catch (error) {
			console.error('Error saving to localStorage:', error);
			openSnackbar('Failed to save nominations');
		}
	}, [openSnackbar]);

	const addNominationMovie = useCallback((movie) => {
		if (nomination.length >= 5) {
			openSnackbar('Only 5 nominations are allowed per user');
			return;
		}

		const exists = nomination.find(o => o.imdbID === movie.imdbID);
		if (exists) {
			openSnackbar('Movie already nominated');
			return;
		}

		const newNominationList = [...nomination, movie];
		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
		openSnackbar('Movie added to nominations');
	}, [nomination, saveToLocalStorage, openSnackbar]);

	const removeNominationMovie = useCallback((movie) => {
		const newNominationList = nomination.filter(
			(nomination) => nomination.imdbID !== movie.imdbID
		);

		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
		openSnackbar('Movie removed from nominations');
	}, [nomination, saveToLocalStorage, openSnackbar]);

	const isNominationsFull = useMemo(() => nomination.length === 5, [nomination.length]);

	return (
		<div>
			<nav className='navigation-bar' role='navigation' aria-label='Main navigation'>
				<button
					className={`nav-btn ${currentPage === 'movies' ? 'active' : ''}`}
					onClick={() => setCurrentPage('movies')}
					aria-pressed={currentPage === 'movies'}
					aria-label='Movies page'
				>
					Movies
				</button>
				<button
					className={`nav-btn ${currentPage === 'todos' ? 'active' : ''}`}
					onClick={() => setCurrentPage('todos')}
					aria-pressed={currentPage === 'todos'}
					aria-label='Todos page'
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
						<div className='banner' role='alert' aria-live='polite'>
							All 5 nominations are done
						</div>
					)}
					{loading ? (
						<Loader />
					) : error ? (
						<div className='error-message' role='alert'>
							{error}
						</div>
					) : movies.length === 0 && debouncedSearchValue ? (
						<div className='empty-state' role='status'>
							<p>No movies found. Try a different search term.</p>
						</div>
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
					{nomination.length === 0 ? (
						<div className='empty-state' role='status'>
							<p>No nominations yet. Add movies from the search results above.</p>
						</div>
					) : (
						<div className='row'>
							<MovieList
								movies={nomination}
								handleNominationClick={removeNominationMovie}
								nominationComponent={RemoveNominations}
							/>
						</div>
					)}
				</div>
			) : (
				<TodoPage />
			)}
		</div>
	);
};

export default App;
