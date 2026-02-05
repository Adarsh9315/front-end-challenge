import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import { useSnackbar } from 'react-simple-snackbar';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [openSnackbar] = useSnackbar();
	const NOMINATION_LIMIT = 5;

	const getMovieRequest = async (query) => {
		if (!query) {
			setMovies([]);
			return;
		}

		const url = `https://www.omdbapi.com/?s=${query}&apikey=a21d8f2b`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		} else {
			setMovies([]);
		}
	};

	useEffect(() => {
		const trimmedQuery = searchValue.trim();
		if (trimmedQuery.length < 3) {
			setMovies([]);
			return;
		}
		getMovieRequest(trimmedQuery);
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
		if (nomination.length === NOMINATION_LIMIT) {
			openSnackbar('Only 5 nominations are allowed per user');
			return;
		}

		const alreadyNominated = nomination.some(
			(nominatedMovie) => nominatedMovie.imdbID === movie.imdbID
		);

		if (alreadyNominated) {
			openSnackbar('You have already nominated this movie');
			return;
		}

		const newNominationList = [...nomination, movie];
		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
	};

	const removeNominationMovie = (movie) => {
		const newNominationList = nomination.filter(
			(nomination) => nomination.imdbID !== movie.imdbID
		);

		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
	};

	const nominationsRemaining = Math.max(NOMINATION_LIMIT - nomination.length, 0);
	const isNominationLimitReached = nominationsRemaining === 0;

	return (
		<div className='movie-app landing'>
			<header className='hero'>
				<div className='hero__content'>
					<p className='eyebrow'>OMDB NOMINATIONS</p>
					<h1>Discover, shortlist, and celebrate your top five films.</h1>
					<p className='hero__description'>
						Dive into the Open Movie Database, search across decades of cinema, and build a curated list
						of the stories that move you. Shareable, memorable, totally yours.
					</p>
					<div className='hero__cta'>
						<a href='#discover' className='btn btn-primary'>Start exploring</a>
						<div className='hero__slots'>
							<span className='hero__slots-count'>{nominationsRemaining}</span>
							slots left
						</div>
					</div>
				</div>
				<div className='hero__panel'>
					<div className='stat-grid'>
						<div className='stat-card'>
							<p className='stat-card__label'>Instant search</p>
							<p className='stat-card__value'>Powered by OMDB</p>
						</div>
						<div className='stat-card'>
							<p className='stat-card__label'>Saved locally</p>
							<p className='stat-card__value'>Your picks stay on this device</p>
						</div>
						<div className='stat-card'>
							<p className='stat-card__label'>Top 5 challenge</p>
							<p className='stat-card__value'>Limit of {NOMINATION_LIMIT} keeps it intentional</p>
						</div>
					</div>
				</div>
			</header>

			<section id='discover' className='section section--dark'>
				<div className='section__header'>
					<div>
						<p className='eyebrow'>Discover</p>
						<MovieListHeading heading='Search the OMDB catalog' />
						<p className='section__description'>Type three or more characters to start surfacing films.</p>
					</div>
					<SearchBox value={searchValue} setSearchValue={setSearchValue} />
				</div>
				{isNominationLimitReached && (
					<div className='banner banner--accent'>All {NOMINATION_LIMIT} nominations are done 🎉</div>
				)}
				<div className='row movie-row'>
					<MovieList
						movies={movies}
						handleNominationClick={addNominationMovie}
						nominationComponent={AddNomination}
					/>
				</div>
			</section>

			<section className='section section--light'>
				<div className='section__header'>
					<div>
						<p className='eyebrow'>Your shortlist</p>
						<MovieListHeading heading={`Nominations (${nomination.length}/${NOMINATION_LIMIT})`} />
						<p className='section__description'>Keep refining until only the essentials remain.</p>
					</div>
				</div>
				<div className='row movie-row'>
					<MovieList
						movies={nomination}
						handleNominationClick={removeNominationMovie}
						nominationComponent={RemoveNominations}
					/>
				</div>
			</section>
		</div>
	);
};

export default App;
