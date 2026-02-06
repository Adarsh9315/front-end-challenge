import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import { useSnackbar } from 'react-simple-snackbar'
import LandingPage from './components/LandingPage';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [openSnackbar] = useSnackbar()
	const experienceRef = useRef(null);

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

 	const getStoredNominations = () => {
 		return JSON.parse(localStorage.getItem('nominations') || '[]');
 	};

	useEffect(() => {
		setNomination(getStoredNominations());
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('nominations', JSON.stringify(items));
	};

	const addNominationMovie = (movie) => {
		const savedNominations = getStoredNominations();
		if (savedNominations.length === 5) {
			openSnackbar('Only 5 nominations are allowed per user')
			return;
		}

		const isAlreadyAdded = savedNominations.some((item) => item.imdbID === movie.imdbID);
		if (!isAlreadyAdded) {
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

	const handleGetStarted = () => {
		experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className='app-shell'>
			<LandingPage onGetStarted={handleGetStarted} />
			<section ref={experienceRef} className='movie-experience'>
				<div className='container-fluid movie-app'>
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Movies' />
						<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</div>
					<div className='banner' style={{display: nominationLimitReached ? 'block' : 'none'}}>
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
			</section>
		</div>
	);
};

export default App;
