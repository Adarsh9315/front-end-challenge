import React, { useState, useEffect } from 'react';
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

const snackbarOptions = {
	position: 'bottom-center',
	style: {
		backgroundColor: '#1a1a2e',
		border: '1px solid rgba(231, 76, 111, 0.3)',
		color: '#e74c6f',
		fontFamily: 'Inter, sans-serif',
		fontSize: '0.9em',
		fontWeight: '500',
		borderRadius: '12px',
		padding: '14px 24px',
		boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
	},
};

const App = () => {
	const [currentPage, setCurrentPage] = useState('movies');
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [openSnackbar] = useSnackbar(snackbarOptions)

	const getMovieRequest = async (searchValue) => {
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

	const getNominationCount = () => {
		try {
			const saved = JSON.parse(localStorage.getItem('nominations'));
			return saved ? saved.length : 0;
		} catch {
			return 0;
		}
	};

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
				<div className='movie-app'>
					<div className='d-flex align-items-center justify-content-between mb-4 mt-2 header-row' style={{ flexWrap: 'wrap', gap: '16px' }}>
						<MovieListHeading heading='Movies' subtitle='Search and nominate your favorites' />
						<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</div>

					{getNominationCount() === 5 && (
						<div className='banner fade-in'>
							All 5 nominations are complete — you're all set!
						</div>
					)}

					{loading ? (
						<Loader />
					) : movies.length > 0 ? (
						<div className='movies-grid fade-in'>
							<MovieList
								movies={movies}
								handleNominationClick={addNominationMovie}
								nominationComponent={AddNomination}
							/>
						</div>
					) : searchValue ? (
						<div className='empty-state'>
							<span className='empty-state-emoji'>🎬</span>
							<p className='empty-state-text'>No movies found for "{searchValue}"</p>
						</div>
					) : (
						<div className='empty-state'>
							<span className='empty-state-emoji'>🔍</span>
							<p className='empty-state-text'>Start typing to search for movies</p>
						</div>
					)}

					<hr className='section-divider' />

					<div className='mb-4'>
						<MovieListHeading heading='Nominations' subtitle={`${nomination.length} of 5 selected`} />
					</div>

					{nomination.length > 0 ? (
						<div className='movies-grid fade-in'>
							<MovieList
								movies={nomination}
								handleNominationClick={removeNominationMovie}
								nominationComponent={RemoveNominations}
							/>
						</div>
					) : (
						<div className='empty-state'>
							<span className='empty-state-emoji'>⭐</span>
							<p className='empty-state-text'>No nominations yet — search and add movies above</p>
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
