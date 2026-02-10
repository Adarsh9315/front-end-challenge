import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddNomination from '../components/AddNomination';
import RemoveNominations from '../components/RemoveNominations.js';
import { useSnackbar } from 'react-simple-snackbar';

const HERO_FEATURES = [
	{
		title: 'Unlimited Discovery',
		description: 'Search across the OMDB catalog and surface surprises for every mood.'
	},
	{
		title: 'Shareable Shortlists',
		description: 'Lock in up to five nominations and celebrate them with your crew.'
	},
	{
		title: 'Live Progress',
		description: 'Track your picks in real time and revisit past favorites instantly.'
	}
];

const NOMINATION_LIMIT = 5;

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

	const getStoredNominations = () => JSON.parse(localStorage.getItem('nominations') || '[]');

	const addNominationMovie = (movie) => {
		if (nomination.length >= NOMINATION_LIMIT) {
			openSnackbar('Only 5 nominations are allowed per user');
			return;
		}

		const alreadyNominated = nomination.some((item) => item.imdbID === movie.imdbID);
		if (alreadyNominated) {
			openSnackbar('This movie is already nominated');
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

	useEffect(() => {
		const stored = getStoredNominations();
		if (stored.length) {
			setNomination(stored);
		}
	}, []);

	const nominationLimitReached = nomination.length >= NOMINATION_LIMIT;
	const highlightedNominations = nomination.slice(0, 3);

	return (
		<div className='movie-page-content'>
			<section className='hero container py-5'>
				<div className='hero-text'>
					<p className='eyebrow mb-2'>The Shoppies 2024</p>
					<h1 className='display-5 fw-bold'>Share the movies that moved you.</h1>
					<p className='lead text-muted'>
						Explore the OMDB catalog, spotlight hidden gems, and lock in five unforgettable nominations.
					</p>
					<div className='hero-actions'>
						<a className='cta primary' href='#discover'>Start discovering</a>
						<a className='cta secondary' href='#nominations'>View your list</a>
					</div>
				</div>
				<div className='hero-panel'>
					<p className='panel-label'>Live nominations</p>
					{highlightedNominations.length ? (
						<ul>
							{highlightedNominations.map((movie) => (
								<li key={movie.imdbID}>
									<span>{movie.Title}</span>
									<small>{movie.Year}</small>
								</li>
							))}
						</ul>
					) : (
						<div className='empty-state'>Nominate your first film to see it here.</div>
					)}
					<div className='limit-note'>
						{nominationLimitReached ? 'Limit reached — refine your shortlist!' : `${NOMINATION_LIMIT - nomination.length} spots remaining`}
					</div>
				</div>
			</section>

			<section className='feature-grid container'>
				{HERO_FEATURES.map((feature) => (
					<div key={feature.title} className='feature-card'>
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</div>
				))}
			</section>

			<section id='discover' className='movie-section container-fluid movie-app'>
				<div className='row d-flex align-items-center mt-4 mb-4'>
					<MovieListHeading heading='Discover movies' />
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				{nominationLimitReached && (
					<div className='banner'>All 5 nominations are done</div>
				)}
				<div className='row'>
					<MovieList
						movies={movies}
						handleNominationClick={addNominationMovie}
						nominationComponent={AddNomination}
					/>
				</div>
			</section>

			<section id='nominations' className='movie-section container-fluid movie-app'>
				<div className='row d-flex align-items-center mt-4 mb-4'>
					<MovieListHeading heading='Your nominations' />
				</div>
				<div className='row'>
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

export default MoviePage;
