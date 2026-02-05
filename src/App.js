import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import { useSnackbar } from 'react-simple-snackbar'

const App = () => {
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

	const nominationLimitReached = nomination.length === 5;

	return (
		<div className='container-fluid movie-app'>
			<section className='landing'>
				<div className='landing-hero'>
					<div className='landing-copy'>
						<span className='landing-kicker'>The Shoppies</span>
						<h1>Build your five-movie shortlist in minutes.</h1>
						<p>
							Search the OMDB catalog, save your top picks, and share your
							nominations when you hit five.
						</p>
						<div className='landing-actions'>
							<a className='btn btn-danger' href='#search'>
								Start nominating
							</a>
							<a className='btn btn-outline-light' href='#how-it-works'>
								How it works
							</a>
						</div>
						<div className='landing-meta'>
							<span>Real-time search</span>
							<span>One list per fan</span>
							<span>Auto-saved progress</span>
						</div>
					</div>
					<div id='how-it-works' className='landing-panel'>
						<div className='landing-panel-card'>
							<h3>1. Find a film</h3>
							<p>Search by title to explore the OMDB library.</p>
						</div>
						<div className='landing-panel-card'>
							<h3>2. Nominate your favorites</h3>
							<p>Pick up to five movies for your final list.</p>
						</div>
						<div className='landing-panel-card'>
							<h3>3. Celebrate your picks</h3>
							<p>Share your list once all five slots are filled.</p>
						</div>
					</div>
				</div>
			</section>
			<div id='search' className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div
				className='banner'
				style={{ display: nominationLimitReached ? 'block' : 'none' }}
			>
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

export default App;
