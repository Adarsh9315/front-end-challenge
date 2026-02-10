import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import ChessGame from './components/ChessGame';
import TodoApp from './components/TodoApp';
import NoteTaking from './components/NoteTaking';
import { useSnackbar } from 'react-simple-snackbar'

const NavBar = () => {
	const location = useLocation();
	return (
		<nav className="app-nav">
			<Link to="/" className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}>
				Movies
			</Link>
			<Link to="/chess" className={`nav-link-item ${location.pathname === '/chess' ? 'active' : ''}`}>
				Chess
			</Link>
			<Link to="/todo" className={`nav-link-item ${location.pathname === '/todo' ? 'active' : ''}`}>
				Todo
			</Link>
			<Link to="/notes" className={`nav-link-item ${location.pathname === '/notes' ? 'active' : ''}`}>
				Notes
			</Link>
		</nav>
	);
};

const MoviesPage = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [openSnackbar] = useSnackbar()

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a21d8f2b`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
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

const App = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path="/" component={MoviesPage} />
				<Route path="/chess" component={ChessGame} />
				<Route path="/todo" component={TodoApp} />
				<Route path="/notes" component={NoteTaking} />
			</Switch>
		</Router>
	);
};

export default App;
