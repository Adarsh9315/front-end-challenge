import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import ChessGame from './components/ChessGame';
import Spinner from './components/Spinner';
import { useSnackbar } from 'react-simple-snackbar'

const NavBar = () => {
	const location = useLocation();

	const navStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '20px',
		padding: '12px 24px',
		background: '#1a1a1a',
		borderBottom: '1px solid #333',
	};

	const linkStyle = (path) => ({
		color: location.pathname === path ? '#ffffff' : '#888',
		textDecoration: 'none',
		fontSize: '1rem',
		fontWeight: location.pathname === path ? '600' : '400',
		padding: '6px 16px',
		borderRadius: '4px',
		background: location.pathname === path ? '#333' : 'transparent',
		transition: 'all 0.2s',
	});

	return (
		<nav style={navStyle}>
			<Link to="/" style={linkStyle('/')}>Movies</Link>
			<Link to="/chess" style={linkStyle('/chess')}>Chess</Link>
		</nav>
	);
};

const MoviePage = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [openSnackbar] = useSnackbar()

	const getMovieRequest = async (searchValue) => {
		if (!searchValue) {
			setMovies([]);
			setLoading(false);
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
			console.error('Error fetching movies:', error);
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

	const nominationsData = JSON.parse(localStorage.getItem('nominations'));
	const showBanner = nominationsData && nominationsData.length === 5;

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='banner' style={{display: showBanner ? 'block' : 'none'}}>
				All 5 nominations are done
			</div>
			<div className='row'>
				{loading ? (
					<Spinner />
				) : (
					<MovieList
						movies={movies}
						handleNominationClick={addNominationMovie}
						nominationComponent={AddNomination}
					/>
				)}
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

const App = () => {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/">
					<MoviePage />
				</Route>
				<Route path="/chess">
					<ChessGame />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
