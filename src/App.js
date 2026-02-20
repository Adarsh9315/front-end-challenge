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
		const movieNomination = JSON.parse(
			localStorage.getItem('nominations')
		);

		if (movieNomination) {
			setNomination(movieNomination);
		}
	}, []);

	const saveToLocalStorage = useCallback((items) => {
		localStorage.setItem('nominations', JSON.stringify(items));
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

	const handlePageChange = useCallback((page) => {
		setCurrentPage(page);
	}, []);

	return (
		<div>
			<div className='navigation-bar'>
				<button
					className={`nav-btn ${currentPage === 'movies' ? 'active' : ''}`}
					onClick={() => handlePageChange('movies')}
					aria-label='Navigate to movies page'
				>
					Movies
				</button>
				<button
					className={`nav-btn ${currentPage === 'todos' ? 'active' : ''}`}
					onClick={() => handlePageChange('todos')}
					aria-label='Navigate to todos page'
				>
					Todos
				</button>
			</div>

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
					) : error ? (
						<div className='error-message'>
							{error}
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
