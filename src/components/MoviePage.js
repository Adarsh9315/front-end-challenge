import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieList from './MovieList';
import MovieListHeading from './MovieListHeading';
import SearchBox from './SearchBox';
import AddNomination from './AddNomination';
import RemoveNominations from './RemoveNominations.js';
import { useSnackbar } from 'react-simple-snackbar';
import './MoviePage.css';

const MoviePage = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [openSnackbar] = useSnackbar();

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
				openSnackbar('Only 5 nominations are allowed per user');
				return;
			}

			let obj = savedNominations.find((o) => o.imdbID === movie.imdbID);
			if (!obj) {
				const newNominationList = [...nomination, movie];
				setNomination(newNominationList);
				saveToLocalStorage(newNominationList);
			}
		} else {
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

	const getNominationsCount = () => {
		const saved = localStorage.getItem('nominations');
		if (saved) {
			return JSON.parse(saved).length;
		}
		return 0;
	};

	return (
		<div className="movie-page">
			<nav className="movie-nav">
				<Link to="/" className="back-link">
					<span className="back-arrow">←</span>
					<span className="nav-brand-text">MovieNominate</span>
				</Link>
				<div className="nomination-counter">
					<span className="counter-label">Nominations:</span>
					<span className="counter-value">{nomination.length}/5</span>
				</div>
			</nav>

			<div className="container-fluid movie-app">
				<div className="row d-flex align-items-center mt-4 mb-4">
					<MovieListHeading heading="Movies" />
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				{getNominationsCount() === 5 && (
					<div className="banner">
						All 5 nominations are done
					</div>
				)}
				<div className="row">
					<MovieList
						movies={movies}
						handleNominationClick={addNominationMovie}
						nominationComponent={AddNomination}
					/>
				</div>
				<div className="row d-flex align-items-center mt-4 mb-4">
					<MovieListHeading heading="Nominations" />
				</div>
				<div className="row">
					<MovieList
						movies={nomination}
						handleNominationClick={removeNominationMovie}
						nominationComponent={RemoveNominations}
					/>
				</div>
			</div>
		</div>
	);
};

export default MoviePage;
