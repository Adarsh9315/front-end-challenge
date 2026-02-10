import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import { useSnackbar } from 'react-simple-snackbar';

const MAX_NOMINATIONS = 5;
const OMDB_API_KEY = 'a21d8f2b';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [openSnackbar] = useSnackbar();

	const getMovieRequest = useCallback(async (searchValue) => {
		if (!searchValue.trim()) {
			setMovies([]);
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&apikey=${OMDB_API_KEY}`;
			const response = await fetch(url);
			
			if (!response.ok) {
				throw new Error('Failed to fetch movies');
			}

			const responseJson = await response.json();

			if (responseJson.Search) {
				setMovies(responseJson.Search);
			} else if (responseJson.Error) {
				setMovies([]);
				setError(responseJson.Error);
			} else {
				setMovies([]);
			}
		} catch (err) {
			setError('Failed to fetch movies. Please try again.');
			setMovies([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			getMovieRequest(searchValue);
		}, 500); // Debounce search

		return () => clearTimeout(timeoutId);
	}, [searchValue, getMovieRequest]);

	useEffect(() => {
		const movieNomination = JSON.parse(
			localStorage.getItem('nominations') || '[]'
		);

		if (movieNomination && Array.isArray(movieNomination)) {
			setNomination(movieNomination);
		}
	}, []);

	const saveToLocalStorage = useCallback((items) => {
		localStorage.setItem('nominations', JSON.stringify(items));
	}, []);

	const addNominationMovie = useCallback((movie) => {
		const savedNominations = JSON.parse(
			localStorage.getItem('nominations') || '[]'
		);

		if (savedNominations.length >= MAX_NOMINATIONS) {
			openSnackbar(`Only ${MAX_NOMINATIONS} nominations are allowed per user`);
			return;
		}

		const alreadyNominated = savedNominations.find(
			(nom) => nom.imdbID === movie.imdbID
		);

		if (alreadyNominated) {
			openSnackbar('This movie is already nominated');
			return;
		}

		const newNominationList = [...savedNominations, movie];
		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
		openSnackbar('Movie nominated successfully!');
	}, [openSnackbar, saveToLocalStorage]);

	const removeNominationMovie = useCallback((movie) => {
		const newNominationList = nomination.filter(
			(nom) => nom.imdbID !== movie.imdbID
		);

		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
		openSnackbar('Nomination removed');
	}, [nomination, saveToLocalStorage, openSnackbar]);

	const showBanner = nomination.length === MAX_NOMINATIONS;

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>

			{showBanner && (
				<div className='banner'>
					All {MAX_NOMINATIONS} nominations are done! 🎉
				</div>
			)}

			{isLoading && (
				<div className='text-center my-4'>
					<div className='spinner-border text-light' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			)}

			{error && (
				<div className='alert alert-warning text-center' role='alert'>
					{error}
				</div>
			)}

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
	);
};

export default App;
