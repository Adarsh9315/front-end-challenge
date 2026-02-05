import React, { useState, useEffect } from 'react';

const MovieShowdown = () => {
	const [movies, setMovies] = useState([]);
	const [currentPair, setCurrentPair] = useState([null, null]);
	const [showdownHistory, setShowdownHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState('action');

	useEffect(() => {
		const savedHistory = JSON.parse(localStorage.getItem('showdownHistory') || '[]');
		setShowdownHistory(savedHistory);
	}, []);

	useEffect(() => {
		fetchMoviesForShowdown(searchValue);
	}, [searchValue]);

	const fetchMoviesForShowdown = async (query) => {
		setLoading(true);
		try {
			const url = `http://www.omdbapi.com/?s=${query}&type=movie&apikey=a21d8f2b`;
			const response = await fetch(url);
			const responseJson = await response.json();

			if (responseJson.Search && responseJson.Search.length >= 2) {
				setMovies(responseJson.Search);
				selectRandomPair(responseJson.Search);
			}
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
		setLoading(false);
	};

	const selectRandomPair = (movieList) => {
		if (movieList.length < 2) return;
		
		const shuffled = [...movieList].sort(() => 0.5 - Math.random());
		setCurrentPair([shuffled[0], shuffled[1]]);
	};

	const handleVote = (winner, loser) => {
		const showdownResult = {
			winner: winner,
			loser: loser,
			timestamp: new Date().toISOString(),
			id: Date.now()
		};

		const updatedHistory = [...showdownHistory, showdownResult];
		setShowdownHistory(updatedHistory);
		localStorage.setItem('showdownHistory', JSON.stringify(updatedHistory));

		// Select new pair
		if (movies.length >= 2) {
			selectRandomPair(movies);
		}
	};

	const getNextShowdown = () => {
		if (movies.length >= 2) {
			selectRandomPair(movies);
		} else {
			fetchMoviesForShowdown(searchValue);
		}
	};

	const categories = ['action', 'comedy', 'drama', 'horror', 'sci-fi', 'romance', 'thriller', 'animation'];

	if (loading) {
		return (
			<div className="showdown-loading">
				<h2>Loading movies...</h2>
			</div>
		);
	}

	return (
		<div className="showdown-container">
			<div className="showdown-header">
				<h1 className="showdown-title">🎬 Movie Showdown</h1>
				<p className="showdown-subtitle">Choose your favorite movie!</p>
			</div>

			<div className="category-selector">
				<label>Select Category: </label>
				<select 
					value={searchValue} 
					onChange={(e) => setSearchValue(e.target.value)}
					className="category-dropdown"
				>
					{categories.map(cat => (
						<option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
					))}
				</select>
			</div>

			{currentPair[0] && currentPair[1] ? (
				<div className="showdown-arena">
					<div className="showdown-card" onClick={() => handleVote(currentPair[0], currentPair[1])}>
						<div className="movie-poster-container">
							<img 
								src={currentPair[0].Poster !== "N/A" ? currentPair[0].Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`}
								alt={currentPair[0].Title}
								className="showdown-poster"
							/>
							<div className="vote-overlay">
								<span className="vote-text">VOTE</span>
							</div>
						</div>
						<div className="movie-info">
							<h3 className="movie-title">{currentPair[0].Title}</h3>
							<p className="movie-year">{currentPair[0].Year}</p>
						</div>
					</div>

					<div className="vs-divider">
						<span className="vs-text">VS</span>
					</div>

					<div className="showdown-card" onClick={() => handleVote(currentPair[1], currentPair[0])}>
						<div className="movie-poster-container">
							<img 
								src={currentPair[1].Poster !== "N/A" ? currentPair[1].Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`}
								alt={currentPair[1].Title}
								className="showdown-poster"
							/>
							<div className="vote-overlay">
								<span className="vote-text">VOTE</span>
							</div>
						</div>
						<div className="movie-info">
							<h3 className="movie-title">{currentPair[1].Title}</h3>
							<p className="movie-year">{currentPair[1].Year}</p>
						</div>
					</div>
				</div>
			) : (
				<div className="no-movies">
					<p>No movies available for showdown</p>
					<button onClick={() => fetchMoviesForShowdown(searchValue)} className="refresh-btn">
						Refresh Movies
					</button>
				</div>
			)}

			<div className="showdown-actions">
				<button onClick={getNextShowdown} className="skip-btn">
					Skip This Matchup
				</button>
			</div>

			<div className="showdown-stats">
				<h3>Total Showdowns: {showdownHistory.length}</h3>
			</div>
		</div>
	);
};

export default MovieShowdown;
