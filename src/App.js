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

const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

const App = () => {
	const [currentPage, setCurrentPage] = useState('movies');
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [openSnackbar] = useSnackbar();
	
	const debouncedSearchValue = useDebounce(searchValue, 500);

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
			localStorage.getItem('nominations') || '[]'
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
			openSnackbar('Only 5 nominations are allowed per user')
			return;
		}

		const obj = nomination.find(o => o.imdbID === movie.imdbID);
		if (!obj) {
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

	const showBanner = nomination.length === 5;
	
	const hasSearchResults = movies.length > 0;
	const hasNominations = nomination.length > 0;
	const showEmptySearch = !loading && searchValue && !hasSearchResults;

	return (
		<div>
			<div className='navigation-bar'>
				<button
					className={`nav-btn ${currentPage === 'movies' ? 'active' : ''}`}
					onClick={() => setCurrentPage('movies')}
				>
					Movies
				</button>
				<button
					className={`nav-btn ${currentPage === 'todos' ? 'active' : ''}`}
					onClick={() => setCurrentPage('todos')}
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
					{showBanner && (
						<div className='banner'>
							All 5 nominations are done!
						</div>
					)}
					{loading ? (
						<Loader />
					) : showEmptySearch ? (
						<div className='empty-state'>
							<div className='empty-state-icon'>🎬</div>
							<p>No movies found for "{searchValue}"</p>
						</div>
					) : (
						<>
							<div className='row'>
								<MovieList
									movies={movies}
									handleNominationClick={addNominationMovie}
									nominationComponent={AddNomination}
								/>
							</div>
						</>
					)}
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Nominations' />
					</div>
					{hasNominations ? (
						<div className='row'>
							<MovieList
								movies={nomination}
								handleNominationClick={removeNominationMovie}
								nominationComponent={RemoveNominations}
							/>
						</div>
					) : (
						<div className='empty-state'>
							<div className='empty-state-icon'>🏆</div>
							<p>No nominations yet. Add some movies!</p>
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
