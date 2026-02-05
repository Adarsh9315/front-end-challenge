import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import { useSnackbar } from 'react-simple-snackbar';

const highlights = [
	{
		title: 'Discover Films Instantly',
		description: 'Search thousands of titles powered by the OMDb API with lightning fast results.'
	},
	{
		title: 'Nominate Your Top Five',
		description: 'Curate a personal shortlist of five standout films and celebrate great cinema.'
	},
	{
		title: 'Share the Hype',
		description: 'Spread the word about your selections and inspire fellow movie lovers to join in.'
	}
];

const NOMINATION_LIMIT = 5;

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [openSnackbar] = useSnackbar();

	const getMovieRequest = async (searchValue) => {
		const trimmedValue = searchValue.trim();
		if (!trimmedValue) {
			setMovies([]);
			return;
		}

		const url = `http://www.omdbapi.com/?s=${trimmedValue}&apikey=a21d8f2b`;

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
		try {
			const stored = localStorage.getItem('nominations');
			if (!stored) return;
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				setNomination(parsed);
			}
		} catch (error) {
			console.error('Failed to parse nominations from storage', error);
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

		const alreadyAdded = nomination.some((item) => item.imdbID === movie.imdbID);
		if (alreadyAdded) {
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

	const handleScrollToNominate = () => {
		const nominateSection = document.getElementById('nominate');
		if (nominateSection) {
			nominateSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const isNominationLimitReached = nomination.length >= NOMINATION_LIMIT;

	return (
		<div className='landing-page'>
			<header className='hero'>
				<div className='hero__overlay' />
				<div className='hero__content'>
					<p className='hero__eyebrow'>The Shoppies 2.0</p>
					<h1>Celebrate cinema with your top {NOMINATION_LIMIT} nominations.</h1>
					<p>
						Discover, nominate, and share the movies that moved you the most. Help us crown
						the crowd favourites.
					</p>
					<div className='hero__actions'>
						<button className='btn btn-primary' onClick={handleScrollToNominate}>
							Start Nominating
						</button>
						<a className='btn btn-outline' href='#features'>Learn More</a>
					</div>
				</div>
			</header>

			<section id='features' className='features' aria-label='Platform highlights'>
				<div className='features__grid'>
					{highlights.map((highlight) => (
						<div key={highlight.title} className='feature-card'>
							<h3>{highlight.title}</h3>
							<p>{highlight.description}</p>
						</div>
					))}
				</div>
			</section>

			<section id='nominate' className='nominate'>
				<div className='container-fluid movie-app'>
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Discover Movies' />
						<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</div>
					{isNominationLimitReached && (
						<div className='banner' role='status' aria-live='polite'>
							You have reached the maximum of {NOMINATION_LIMIT} nominations.
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
						<MovieListHeading heading='Your Nominations' />
					</div>
					<div className='row'>
						<MovieList
							movies={nomination}
							handleNominationClick={removeNominationMovie}
							nominationComponent={RemoveNominations}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default App;
