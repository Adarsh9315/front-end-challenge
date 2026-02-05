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

	return (
		<div className='movie-app'>
			<section className='landing-hero'>
				<div className='container'>
					<p className='landing-eyebrow'>Movie night, curated</p>
					<h1 className='landing-title'>Build your top 5 movie nominations in minutes.</h1>
					<p className='landing-lead'>
						Search the OMDb catalog, shortlist favorites, and keep your picks
						synced across visits.
					</p>
					<div className='landing-actions'>
						<a className='btn btn-primary landing-cta-btn' href='#search'>
							Start searching
						</a>
						<a className='btn btn-outline-light landing-ghost-btn' href='#how-it-works'>
							How it works
						</a>
					</div>
					<div className='landing-stats'>
						<div className='landing-stat'>
							<span>10k+</span>
							<span>titles indexed</span>
						</div>
						<div className='landing-stat'>
							<span>5</span>
							<span>nominations per list</span>
						</div>
						<div className='landing-stat'>
							<span>Instant</span>
							<span>updates as you search</span>
						</div>
					</div>
				</div>
			</section>

			<section className='landing-section' id='how-it-works'>
				<div className='container'>
					<h2 className='landing-section-title'>How it works</h2>
					<div className='landing-grid'>
						<div className='landing-card'>
							<h3>1. Search</h3>
							<p>Find any movie by title and browse poster art instantly.</p>
						</div>
						<div className='landing-card'>
							<h3>2. Nominate</h3>
							<p>Pick up to five favorites and keep them handy in your list.</p>
						</div>
						<div className='landing-card'>
							<h3>3. Refine</h3>
							<p>Swap, remove, and fine-tune until your lineup feels perfect.</p>
						</div>
					</div>
				</div>
			</section>

			<section className='landing-section landing-highlight'>
				<div className='container landing-highlight__content'>
					<div>
						<h2 className='landing-section-title'>Why it works for movie nights</h2>
						<p className='landing-lead'>
							Share a focused list with friends and quickly align on what to
							watch next.
						</p>
					</div>
					<ul className='landing-checklist'>
						<li>Clean layout that keeps your shortlist visible.</li>
						<li>Local storage keeps nominations saved between sessions.</li>
						<li>Built-in limit prevents overwhelming choices.</li>
					</ul>
				</div>
			</section>

			<section className='landing-section landing-cta'>
				<div className='container landing-cta__content'>
					<div>
						<h2 className='landing-section-title'>Ready to start your list?</h2>
						<p className='landing-lead'>
							Jump into the search experience and build your top picks now.
						</p>
					</div>
					<a className='btn btn-primary landing-cta-btn' href='#search'>
						Explore movies
					</a>
				</div>
			</section>

			<div className='container-fluid movie-app__content' id='search'>
				<div className='row d-flex align-items-center mt-4 mb-4'>
					<MovieListHeading heading='Movies' />
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				<div className='banner' style={{display: nomination.length === 5 ? 'block' : 'none'}}>
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
		</div>
	);
};

export default App;
