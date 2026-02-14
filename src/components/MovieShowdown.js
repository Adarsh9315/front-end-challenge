import React, { useState, useEffect } from 'react';

const MovieShowdown = ({ movies, onVote }) => {
	const [moviePair, setMoviePair] = useState([null, null]);
	const [votes, setVotes] = useState({});
	const [hasVoted, setHasVoted] = useState(false);

	useEffect(() => {
		const savedVotes = JSON.parse(localStorage.getItem('movieVotes') || '{}');
		setVotes(savedVotes);
	}, []);

	useEffect(() => {
		if (movies && movies.length >= 2) {
			selectRandomPair();
		}
	}, [movies]);

	const selectRandomPair = () => {
		if (movies.length < 2) return;

		const shuffled = [...movies].sort(() => 0.5 - Math.random());
		setMoviePair([shuffled[0], shuffled[1]]);
		setHasVoted(false);
	};

	const handleVote = (movie) => {
		const newVotes = { ...votes };
		newVotes[movie.imdbID] = (newVotes[movie.imdbID] || 0) + 1;

		setVotes(newVotes);
		localStorage.setItem('movieVotes', JSON.stringify(newVotes));
		setHasVoted(true);

		if (onVote) {
			onVote(movie);
		}

		setTimeout(() => {
			selectRandomPair();
		}, 1500);
	};

	const getVoteCount = (imdbID) => {
		return votes[imdbID] || 0;
	};

	if (!moviePair[0] || !moviePair[1]) {
		return (
			<div className='showdown-container'>
				<h2>Movie Showdown</h2>
				<p>Add at least 2 movies to start voting!</p>
			</div>
		);
	}

	return (
		<div className='showdown-container'>
			<h2>Movie Showdown</h2>
			<p className='showdown-subtitle'>Which movie do you prefer?</p>

			<div className='showdown-battle'>
				<div
					className={`showdown-movie ${hasVoted ? 'voted' : ''}`}
					onClick={() => !hasVoted && handleVote(moviePair[0])}
				>
					<img
						src={moviePair[0].Poster !== "N/A" ? moviePair[0].Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`}
						alt={moviePair[0].Title}
					/>
					<h3>{moviePair[0].Title}</h3>
					<p className='movie-year'>{moviePair[0].Year}</p>
					<div className='vote-count'>
						{getVoteCount(moviePair[0].imdbID)} votes
					</div>
				</div>

				<div className='vs-divider'>VS</div>

				<div
					className={`showdown-movie ${hasVoted ? 'voted' : ''}`}
					onClick={() => !hasVoted && handleVote(moviePair[1])}
				>
					<img
						src={moviePair[1].Poster !== "N/A" ? moviePair[1].Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`}
						alt={moviePair[1].Title}
					/>
					<h3>{moviePair[1].Title}</h3>
					<p className='movie-year'>{moviePair[1].Year}</p>
					<div className='vote-count'>
						{getVoteCount(moviePair[1].imdbID)} votes
					</div>
				</div>
			</div>

			{hasVoted && (
				<div className='vote-success'>
					Vote recorded! Loading next matchup...
				</div>
			)}

			<button
				className='btn-handler skip-button'
				onClick={selectRandomPair}
				disabled={hasVoted}
			>
				Skip This Matchup
			</button>
		</div>
	);
};

export default MovieShowdown;
