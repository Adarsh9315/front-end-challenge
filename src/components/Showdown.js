import React, { useState, useEffect, useCallback } from 'react';

const MOVIE_QUERIES = [
	'Batman', 'Spider', 'Star Wars', 'Avengers', 'Lord', 'Harry Potter',
	'Iron Man', 'Jurassic', 'Matrix', 'Inception', 'Interstellar', 'Gladiator',
	'Titanic', 'Alien', 'Terminator', 'Rocky', 'Godfather', 'Dark Knight',
	'Toy Story', 'Frozen', 'Shrek', 'Pirates', 'Transformers', 'Mission Impossible',
	'Fast Furious', 'John Wick', 'Joker', 'Wonder Woman', 'Black Panther', 'Thor',
];

const DEFAULT_POSTER = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';

const getVotes = () => {
	try {
		const stored = localStorage.getItem('showdownVotes');
		return stored ? JSON.parse(stored) : {};
	} catch {
		return {};
	}
};

const saveVotes = (votes) => {
	localStorage.setItem('showdownVotes', JSON.stringify(votes));
};

const Showdown = () => {
	const [movieA, setMovieA] = useState(null);
	const [movieB, setMovieB] = useState(null);
	const [votes, setVotes] = useState(getVotes);
	const [loading, setLoading] = useState(true);
	const [voted, setVoted] = useState(null);
	const [matchCount, setMatchCount] = useState(0);

	const fetchRandomMovie = useCallback(async (excludeId) => {
		const maxAttempts = 5;
		for (let i = 0; i < maxAttempts; i++) {
			const query = MOVIE_QUERIES[Math.floor(Math.random() * MOVIE_QUERIES.length)];
			try {
				const response = await fetch(
					`https://www.omdbapi.com/?s=${query}&apikey=a21d8f2b`
				);
				const data = await response.json();
				if (data.Search && data.Search.length > 0) {
					const candidates = data.Search.filter(
						(m) => m.Poster !== 'N/A' && m.imdbID !== excludeId
					);
					if (candidates.length > 0) {
						return candidates[Math.floor(Math.random() * candidates.length)];
					}
				}
			} catch (err) {
				// retry on failure
			}
		}
		return null;
	}, []);

	const loadMatchup = useCallback(async () => {
		setLoading(true);
		setVoted(null);
		const a = await fetchRandomMovie(null);
		const b = await fetchRandomMovie(a ? a.imdbID : null);
		setMovieA(a);
		setMovieB(b);
		setLoading(false);
	}, [fetchRandomMovie]);

	useEffect(() => {
		loadMatchup();
	}, [loadMatchup]);

	const castVote = (movie) => {
		if (voted) return;
		setVoted(movie.imdbID);

		const updated = { ...votes };
		if (updated[movie.imdbID]) {
			updated[movie.imdbID].votes += 1;
		} else {
			updated[movie.imdbID] = {
				title: movie.Title,
				poster: movie.Poster,
				year: movie.Year,
				votes: 1,
			};
		}
		setVotes(updated);
		saveVotes(updated);
		setMatchCount((c) => c + 1);

		setTimeout(() => {
			loadMatchup();
		}, 1200);
	};

	const leaderboard = Object.entries(votes)
		.map(([id, data]) => ({ id, ...data }))
		.sort((a, b) => b.votes - a.votes)
		.slice(0, 10);

	const renderCard = (movie, side) => {
		if (!movie) return null;
		const isWinner = voted === movie.imdbID;
		const isLoser = voted && voted !== movie.imdbID;

		return (
			<div
				className={`showdown-card ${isWinner ? 'showdown-winner' : ''} ${isLoser ? 'showdown-loser' : ''}`}
				onClick={() => castVote(movie)}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => e.key === 'Enter' && castVote(movie)}
			>
				<div className="showdown-card-glow" />
				<img
					src={movie.Poster !== 'N/A' ? movie.Poster : DEFAULT_POSTER}
					alt={movie.Title}
					className="showdown-poster"
				/>
				<div className="showdown-card-info">
					<h3 className="showdown-title">{movie.Title}</h3>
					<span className="showdown-year">{movie.Year}</span>
					{votes[movie.imdbID] && (
						<span className="showdown-vote-count">
							{votes[movie.imdbID].votes} vote{votes[movie.imdbID].votes !== 1 ? 's' : ''}
						</span>
					)}
				</div>
				<div className="showdown-vote-label">
					{isWinner ? 'Voted!' : 'Click to Vote'}
				</div>
			</div>
		);
	};

	return (
		<div className="showdown-container">
			<div className="showdown-header">
				<h1 className="showdown-main-title">Movie Showdown</h1>
				<p className="showdown-subtitle">
					Pick your favorite — the ultimate movie face-off!
				</p>
				<div className="showdown-stats">
					Matchups played: <strong>{matchCount}</strong>
				</div>
			</div>

			{loading ? (
				<div className="showdown-loading">
					<div className="showdown-spinner" />
					<p>Loading matchup...</p>
				</div>
			) : (
				<div className="showdown-arena">
					{renderCard(movieA, 'left')}
					<div className="showdown-vs">
						<span className="vs-text">VS</span>
					</div>
					{renderCard(movieB, 'right')}
				</div>
			)}

			<div className="showdown-actions">
				<button
					className="showdown-skip-btn"
					onClick={loadMatchup}
					disabled={loading}
				>
					Skip — Next Matchup
				</button>
			</div>

			{leaderboard.length > 0 && (
				<div className="showdown-leaderboard">
					<h2 className="leaderboard-title">Leaderboard — Top Voted</h2>
					<div className="leaderboard-list">
						{leaderboard.map((entry, index) => (
							<div
								key={entry.id}
								className={`leaderboard-row ${index < 3 ? 'leaderboard-top' : ''}`}
							>
								<span className="leaderboard-rank">
									{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
								</span>
								<img
									src={entry.poster !== 'N/A' ? entry.poster : DEFAULT_POSTER}
									alt={entry.title}
									className="leaderboard-thumb"
								/>
								<div className="leaderboard-info">
									<span className="leaderboard-name">{entry.title}</span>
									<span className="leaderboard-year">{entry.year}</span>
								</div>
								<span className="leaderboard-votes">
									{entry.votes} vote{entry.votes !== 1 ? 's' : ''}
								</span>
							</div>
						))}
					</div>
					<button
						className="showdown-reset-btn"
						onClick={() => {
							setVotes({});
							saveVotes({});
						}}
					>
						Reset Leaderboard
					</button>
				</div>
			)}
		</div>
	);
};

export default Showdown;
