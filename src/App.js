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
		<div className='app-shell'>
			<section className='landing'>
				<div className='landing__inner'>
					<div className='landing__content'>
						<p className='landing__eyebrow'>The Shoppies</p>
						<h1 className='landing__title'>Nominate the movies that deserve the spotlight.</h1>
						<p className='landing__lead'>
							Build your awards night lineup by searching the OMDb catalog and saving up to five
							favorites. Keep your list synced automatically as you curate.
						</p>
						<div className='landing__actions'>
							<a className='btn btn-primary landing__primary' href='#search'>
								Start nominating
							</a>
							<a className='btn btn-outline-light landing__secondary' href='#how-it-works'>
								How it works
							</a>
						</div>
						<div className='landing__stats'>
							<div className='landing__stat'>
								<span className='landing__stat-number'>5</span>
								<span className='landing__stat-label'>Nominations per list</span>
							</div>
							<div className='landing__stat'>
								<span className='landing__stat-number'>Unlimited</span>
								<span className='landing__stat-label'>Search results to explore</span>
							</div>
							<div className='landing__stat'>
								<span className='landing__stat-number'>0</span>
								<span className='landing__stat-label'>Signups required</span>
							</div>
						</div>
					</div>
					<div className='landing__panel'>
						<div className='landing__panel-card'>
							<p className='landing__panel-title'>Live list preview</p>
							<ul className='landing__panel-list'>
								<li>Search any title or year</li>
								<li>Tap to add a nomination</li>
								<li>Swap picks anytime</li>
							</ul>
						</div>
						<div className='landing__panel-card landing__panel-card--accent'>
							<p className='landing__panel-title'>Nomination tips</p>
							<p className='landing__panel-copy'>
								Mix blockbusters, indie gems, and crowd favorites to create a balanced slate.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='landing-section' id='how-it-works'>
				<div className='landing-section__inner'>
					<h2 className='landing-section__title'>How it works</h2>
					<p className='landing-section__subtitle'>
						Three quick steps to lock in your final nominations.
					</p>
					<div className='landing-steps'>
						<div className='landing-step'>
							<span className='landing-step__number'>01</span>
							<h3 className='landing-step__title'>Search</h3>
							<p className='landing-step__copy'>
								Type any movie title to explore results from the OMDb database.
							</p>
						</div>
						<div className='landing-step'>
							<span className='landing-step__number'>02</span>
							<h3 className='landing-step__title'>Nominate</h3>
							<p className='landing-step__copy'>
								Add up to five picks to your nomination list with one click.
							</p>
						</div>
						<div className='landing-step'>
							<span className='landing-step__number'>03</span>
							<h3 className='landing-step__title'>Refine</h3>
							<p className='landing-step__copy'>
								Swap titles until your list feels perfect and share-ready.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='landing-section landing-section--alt' id='get-started'>
				<div className='landing-section__inner landing-section__inner--split'>
					<div>
						<h2 className='landing-section__title'>Ready to build your list?</h2>
						<p className='landing-section__subtitle'>
							Start searching below and watch your nominations fill up in real time.
						</p>
					</div>
					<div className='landing-badges'>
						<span>Fast search</span>
						<span>Local storage</span>
						<span>Nomination alerts</span>
					</div>
				</div>
			</section>

			<div className='container-fluid movie-app'>
				<div className='row d-flex align-items-center mt-4 mb-4' id='search'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				<div className='banner' style={{display: JSON.parse(localStorage.getItem('nominations')).length === 5 ? 'block' : 'none'}}>
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
