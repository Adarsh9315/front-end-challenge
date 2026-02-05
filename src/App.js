import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import MovieShowdown from './components/MovieShowdown';
import Leaderboard from './components/Leaderboard';
import { useSnackbar } from 'react-simple-snackbar'

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [activeTab, setActiveTab] = useState('showdown');
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
			localStorage.getItem('nominations') || '[]'
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
		<div className='app-container'>
			<nav className='nav-tabs'>
				<button 
					className={`nav-tab ${activeTab === 'showdown' ? 'active' : ''}`}
					onClick={() => setActiveTab('showdown')}
				>
					🎬 Showdown
				</button>
				<button 
					className={`nav-tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
					onClick={() => setActiveTab('leaderboard')}
				>
					🏆 Leaderboard
				</button>
				<button 
					className={`nav-tab ${activeTab === 'nominations' ? 'active' : ''}`}
					onClick={() => setActiveTab('nominations')}
				>
					⭐ Nominations
				</button>
			</nav>

			{activeTab === 'showdown' && (
				<MovieShowdown />
			)}

			{activeTab === 'leaderboard' && (
				<Leaderboard />
			)}

			{activeTab === 'nominations' && (
				<div className='container-fluid movie-app'>
					<div className='row d-flex align-items-center mt-4 mb-4'>
						<MovieListHeading heading='Movies' />
						<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</div>
					{nomination.length === 5 && (
						<div className='banner'>
							All 5 nominations are done
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
			)}
		</div>
	);
};

export default App;
