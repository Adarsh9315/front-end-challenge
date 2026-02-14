import React, { useState, useEffect } from 'react';

const MovieShowdown = () => {
	const [nominations, setNominations] = useState([]);
	const [movie1, setMovie1] = useState(null);
	const [movie2, setMovie2] = useState(null);
	const [votes, setVotes] = useState({});
	const [showResult, setShowResult] = useState(false);
	const [winner, setWinner] = useState(null);

	useEffect(() => {
		// Load nominations from localStorage
		const savedNominations = JSON.parse(localStorage.getItem('nominations') || '[]');
		setNominations(savedNominations);

		// Load votes from localStorage
		const savedVotes = JSON.parse(localStorage.getItem('movieVotes') || '{}');
		setVotes(savedVotes);

		// Initialize first showdown
		if (savedNominations.length >= 2) {
			selectRandomMovies(savedNominations);
		}
	}, []);

	const selectRandomMovies = (movieList) => {
		if (movieList.length < 2) return;

		const shuffled = [...movieList].sort(() => 0.5 - Math.random());
		setMovie1(shuffled[0]);
		setMovie2(shuffled[1]);
		setShowResult(false);
		setWinner(null);
	};

	const handleVote = (movie) => {
		const newVotes = { ...votes };
		if (!newVotes[movie.imdbID]) {
			newVotes[movie.imdbID] = 0;
		}
		newVotes[movie.imdbID]++;

		setVotes(newVotes);
		localStorage.setItem('movieVotes', JSON.stringify(newVotes));

		// Show winner animation
		setWinner(movie);
		setShowResult(true);

		// Auto-load next showdown after 2 seconds
		setTimeout(() => {
			selectRandomMovies(nominations);
		}, 2000);
	};

	const getVoteCount = (movie) => {
		return votes[movie?.imdbID] || 0;
	};

	const resetVotes = () => {
		setVotes({});
		localStorage.setItem('movieVotes', JSON.stringify({}));
	};

	const getTopMovies = () => {
		return Object.entries(votes)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5)
			.map(([imdbID, voteCount]) => {
				const movie = nominations.find(m => m.imdbID === imdbID);
				return { movie, voteCount };
			})
			.filter(item => item.movie);
	};

	if (nominations.length < 2) {
		return (
			<div className="showdown-container">
				<div className="showdown-message">
					<h2>Not Enough Movies!</h2>
					<p>You need at least 2 nominated movies to start a showdown.</p>
					<p>Go back and nominate more movies!</p>
				</div>
			</div>
		);
	}

	return (
		<div className="showdown-container">
			<div className="showdown-header">
				<h1>🎬 Movie Showdown 🎬</h1>
				<p>Vote for your favorite movie!</p>
			</div>

			<div className="showdown-arena">
				{movie1 && movie2 && (
					<>
						<div className={`showdown-movie ${showResult && winner?.imdbID === movie1.imdbID ? 'winner' : ''} ${showResult && winner?.imdbID !== movie1.imdbID ? 'loser' : ''}`}>
							<div className="movie-poster-container">
								<img 
									src={movie1.Poster !== "N/A" ? movie1.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} 
									alt={movie1.Title}
									className="showdown-poster"
								/>
							</div>
							<h3>{movie1.Title}</h3>
							<p className="movie-year">{movie1.Year}</p>
							<div className="vote-count">Votes: {getVoteCount(movie1)}</div>
							<button 
								className="vote-button"
								onClick={() => handleVote(movie1)}
								disabled={showResult}
							>
								Vote for this!
							</button>
						</div>

						<div className="vs-divider">
							<span>VS</span>
						</div>

						<div className={`showdown-movie ${showResult && winner?.imdbID === movie2.imdbID ? 'winner' : ''} ${showResult && winner?.imdbID !== movie2.imdbID ? 'loser' : ''}`}>
							<div className="movie-poster-container">
								<img 
									src={movie2.Poster !== "N/A" ? movie2.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} 
									alt={movie2.Title}
									className="showdown-poster"
								/>
							</div>
							<h3>{movie2.Title}</h3>
							<p className="movie-year">{movie2.Year}</p>
							<div className="vote-count">Votes: {getVoteCount(movie2)}</div>
							<button 
								className="vote-button"
								onClick={() => handleVote(movie2)}
								disabled={showResult}
							>
								Vote for this!
							</button>
						</div>
					</>
				)}
			</div>

			<div className="showdown-controls">
				<button 
					className="control-button"
					onClick={() => selectRandomMovies(nominations)}
				>
					Skip This Matchup
				</button>
				<button 
					className="control-button reset-button"
					onClick={resetVotes}
				>
					Reset All Votes
				</button>
			</div>

			{getTopMovies().length > 0 && (
				<div className="leaderboard">
					<h2>🏆 Top Voted Movies 🏆</h2>
					<div className="leaderboard-list">
						{getTopMovies().map((item, index) => (
							<div key={item.movie.imdbID} className="leaderboard-item">
								<span className="rank">#{index + 1}</span>
								<img 
									src={item.movie.Poster !== "N/A" ? item.movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`}
									alt={item.movie.Title}
									className="leaderboard-poster"
								/>
								<div className="leaderboard-info">
									<span className="leaderboard-title">{item.movie.Title}</span>
									<span className="leaderboard-year">({item.movie.Year})</span>
								</div>
								<span className="leaderboard-votes">{item.voteCount} votes</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieShowdown;
