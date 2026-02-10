import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations';
import { useSnackbar } from 'react-simple-snackbar';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'a21d8f2b';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [openSnackbar] = useSnackbar();

	const getMovieRequest = useCallback(async (searchValue) => {
		if (!searchValue.trim()) {
			setMovies([]);
			setError(null);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&apikey=${API_KEY}`;

			const response = await fetch(url);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const responseJson = await response.json();

			if (responseJson.Response === 'False') {
				setError(responseJson.Error || 'No movies found');
				setMovies([]);
			} else if (responseJson.Search) {
				setMovies(responseJson.Search);
				setError(null);
			}
		} catch (err) {
			setError('Failed to fetch movies. Please try again later.');
			setMovies([]);
			console.error('Error fetching movies:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			getMovieRequest(searchValue);
		}, 300); // Debounce search

		return () => clearTimeout(timeoutId);
	}, [searchValue, getMovieRequest]);

	useEffect(() => {
		try {
			const movieNomination = JSON.parse(
				localStorage.getItem('nominations') || '[]'
			);

			if (Array.isArray(movieNomination)) {
				setNomination(movieNomination);
			}
		} catch (err) {
			console.error('Error loading nominations from localStorage:', err);
			setNomination([]);
		}
	}, []);

	const saveToLocalStorage = useCallback((items) => {
		try {
			localStorage.setItem('nominations', JSON.stringify(items));
		} catch (err) {
			console.error('Error saving to localStorage:', err);
			openSnackbar('Failed to save nominations');
		}
	}, [openSnackbar]);

	const addNominationMovie = useCallback((movie) => {
		if (nomination.length >= 5) {
			openSnackbar('Only 5 nominations are allowed per user');
			return;
		}

		const isAlreadyNominated = nomination.some(n => n.imdbID === movie.imdbID);
		if (isAlreadyNominated) {
			openSnackbar('This movie is already nominated');
			return;
		}

		const newNominationList = [...nomination, movie];
		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
		openSnackbar('Movie nominated successfully!');
	}, [nomination, saveToLocalStorage, openSnackbar]);

	const removeNominationMovie = useCallback((movie) => {
		const newNominationList = nomination.filter(
			(nom) => nom.imdbID !== movie.imdbID
		);

		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
		openSnackbar('Nomination removed');
	}, [nomination, saveToLocalStorage, openSnackbar]);

	const isMaxNominations = nomination.length === 5;

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			
			{isMaxNominations && (
				<div className='banner' role="alert" aria-live="polite">
					All 5 nominations are done
				</div>
			)}

			{error && (
				<div className='alert alert-warning' role="alert">
					{error}
				</div>
			)}

			{loading && (
				<div className='text-center my-4'>
					<div className='spinner-border text-light' role="status">
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			)}

			<div className='row'>
				<MovieList
					movies={movies}
					handleNominationClick={addNominationMovie}
					nominationComponent={AddNomination}
					nomination={nomination}
				/>
			</div>

			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading={`Nominations (${nomination.length}/5)`} />
			</div>

			{nomination.length === 0 ? (
				<div className='text-center my-4'>
					<p className='text-muted'>No nominations yet. Start nominating your favorite movies!</p>
				</div>
			) : (
				<div className='row'>
					<MovieList
						movies={nomination}
						handleNominationClick={removeNominationMovie}
						nominationComponent={RemoveNominations}
						nomination={nomination}
					/>
				</div>
			)}
		</div>
	);
};

export default App;
