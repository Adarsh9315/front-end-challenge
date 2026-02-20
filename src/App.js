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
		if (nomination.length === 5) {
			openSnackbar('Only 5 nominations are allowed per user');
			return;
		}

		const isAlreadyNominated = nomination.some(n => n.imdbID === movie.imdbID);
		if (!isAlreadyNominated) {
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

	const isMaxNominations = useMemo(() => nomination.length === 5, [nomination.length]);

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
					{isMaxNominations && (
						<div className='banner'>
							All 5 nominations are done
						</div>
					)}
					{loading ? (
						<Loader />
					) : (
						<div className='row'>
							{movies.length > 0 ? (
								<MovieList
									movies={movies}
									handleNominationClick={addNominationMovie}
									nominationComponent={AddNomination}
								/>
							) : (
								debouncedSearchValue && (
									<div className='empty-state'>
										<p>No movies found. Try a different search term.</p>
									</div>
								)
							)}
						</div>
					)}
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Nominations' />
					</div>
					<div className='row'>
						{nomination.length > 0 ? (
							<MovieList
								movies={nomination}
								handleNominationClick={removeNominationMovie}
								nominationComponent={RemoveNominations}
							/>
						) : (
							<div className='empty-state'>
								<p>No nominations yet. Add movies to your nominations list!</p>
							</div>
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
