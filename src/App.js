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
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=a21d8f2b`;

		try {
			const response = await fetch(url);
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
			setError('Failed to fetch movies. Please try again.');
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
		}
	}, []);

	const addNominationMovie = useCallback((movie) => {
		if (nomination.length >= 5) {
			openSnackbar('Only 5 nominations are allowed per user');
			return;
		}

		const existingNomination = nomination.find(n => n.imdbID === movie.imdbID);
		if (existingNomination) {
			openSnackbar('Movie already nominated');
			return;
		}

		const newNominationList = [...nomination, movie];
		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
	}, [nomination, openSnackbar, saveToLocalStorage]);

	const removeNominationMovie = useCallback((movie) => {
		const newNominationList = nomination.filter(
			(nomination) => nomination.imdbID !== movie.imdbID
		);

		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
	}, [nomination, saveToLocalStorage]);

	const isNominationsFull = useMemo(() => nomination.length === 5, [nomination]);

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
					{error && (
						<div className='alert alert-warning' role='alert'>
							{error}
						</div>
					)}
					{loading ? (
						<Loader />
					) : (
						<div className='row'>
							{movies.length === 0 && !loading && searchValue && !error ? (
								<div className='col-12 empty-state empty-state-movies'>
									<p>No movies found. Try a different search term.</p>
								</div>
							) : (
								<MovieList
									movies={movies}
									handleNominationClick={addNominationMovie}
									nominationComponent={AddNomination}
									isRemoveAction={false}
								/>
							)}
						</div>
					)}
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Nominations' />
					</div>
					<div className='row'>
						{nomination.length === 0 ? (
							<div className='col-12 empty-state empty-state-nominations'>
								<p>No nominations yet. Add movies to your nominations list!</p>
							</div>
						) : (
							<MovieList
								movies={nomination}
								handleNominationClick={removeNominationMovie}
								nominationComponent={RemoveNominations}
								isRemoveAction={true}
							/>
						)}
					</div>
				</div>
			) : (
				<TodoPage />
			)}
		</div>
	);
};

export default App;
