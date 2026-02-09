import React, { useState, useEffect, useCallback } from 'react';
import ShowdownLeaderboard from './ShowdownLeaderboard';

const SHOWDOWN_MOVIES = [
	{ id: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Poster: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0068646', Title: 'The Godfather', Year: '1972', Poster: 'https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0468569', Title: 'The Dark Knight', Year: '2008', Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg' },
	{ id: 'tt0108052', Title: "Schindler's List", Year: '1993', Poster: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
	{ id: 'tt0167260', Title: 'The Lord of the Rings: The Return of the King', Year: '2003', Poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlZjY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' },
	{ id: 'tt0110912', Title: 'Pulp Fiction', Year: '1994', Poster: 'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0137523', Title: 'Fight Club', Year: '1999', Poster: 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0109830', Title: 'Forrest Gump', Year: '1994', Poster: 'https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTYtZmU5YS00YjQ5LTljYjgtMjY2NDVhYWYyNWFmXkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0133093', Title: 'The Matrix', Year: '1999', Poster: 'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZDYxZjlhZjhkXkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0120737', Title: 'The Lord of the Rings: The Fellowship of the Ring', Year: '2001', Poster: 'https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmFiXkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0080684', Title: 'Star Wars: Episode V - The Empire Strikes Back', Year: '1980', Poster: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' },
	{ id: 'tt0816692', Title: 'Interstellar', Year: '2014', Poster: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0114369', Title: 'Se7en', Year: '1995', Poster: 'https://m.media-amazon.com/images/M/MV5BY2IzNGNiODgtOWYzOS00OTI0LTgxZTUtOTA2OTQzOTczYmQzXkEyXkFqcGc@._V1_SX300.jpg' },
	{ id: 'tt0102926', Title: 'The Silence of the Lambs', Year: '1991', Poster: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
	{ id: 'tt0245429', Title: 'Spirited Away', Year: '2001', Poster: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
	{ id: 'tt0482571', Title: 'The Prestige', Year: '2006', Poster: 'https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg' },
];

const generateMatchups = () => {
	const shuffled = [...SHOWDOWN_MOVIES].sort(() => Math.random() - 0.5);
	const pairs = [];
	for (let i = 0; i < shuffled.length; i += 2) {
		pairs.push([shuffled[i], shuffled[i + 1]]);
	}
	return pairs;
};

const STORAGE_KEY_VOTES = 'showdown-votes';
const STORAGE_KEY_MATCHUPS = 'showdown-matchups';
const STORAGE_KEY_ROUND = 'showdown-current-round';

const loadFromStorage = (key, fallback) => {
	try {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : fallback;
	} catch {
		return fallback;
	}
};

const MovieShowdown = () => {
	const [matchups, setMatchups] = useState(() => loadFromStorage(STORAGE_KEY_MATCHUPS, null) || generateMatchups());
	const [currentRound, setCurrentRound] = useState(() => loadFromStorage(STORAGE_KEY_ROUND, 0));
	const [votes, setVotes] = useState(() => loadFromStorage(STORAGE_KEY_VOTES, {}));
	const [voted, setVoted] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [showLeaderboard, setShowLeaderboard] = useState(false);
	const [animateIn, setAnimateIn] = useState(true);

	const isFinished = currentRound >= matchups.length;

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(votes));
	}, [votes]);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY_MATCHUPS, JSON.stringify(matchups));
	}, [matchups]);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY_ROUND, JSON.stringify(currentRound));
	}, [currentRound]);

	const handleVote = useCallback((movie) => {
		if (voted) return;
		setSelectedId(movie.id);
		setVoted(true);
		setVotes((prev) => ({
			...prev,
			[movie.id]: (prev[movie.id] || 0) + 1,
		}));
	}, [voted]);

	const handleNext = useCallback(() => {
		setAnimateIn(false);
		setTimeout(() => {
			setCurrentRound((prev) => prev + 1);
			setVoted(false);
			setSelectedId(null);
			setAnimateIn(true);
		}, 300);
	}, []);

	const handlePlayAgain = useCallback(() => {
		const newMatchups = generateMatchups();
		setMatchups(newMatchups);
		setCurrentRound(0);
		setVoted(false);
		setSelectedId(null);
		setShowLeaderboard(false);
		setAnimateIn(true);
	}, []);

	const handleResetAll = useCallback(() => {
		setVotes({});
		handlePlayAgain();
	}, [handlePlayAgain]);

	const getMovieVotes = (movieId) => votes[movieId] || 0;

	const getTotalVotesForPair = (movie1, movie2) => {
		return getMovieVotes(movie1.id) + getMovieVotes(movie2.id);
	};

	const getVotePercent = (movieId, total) => {
		if (total === 0) return 50;
		return Math.round((getMovieVotes(movieId) / total) * 100);
	};

	if (showLeaderboard) {
		return (
			<div className="showdown-container">
				<div className="showdown-header">
					<h1 className="showdown-title">Movie Showdown</h1>
					<p className="showdown-subtitle">Leaderboard - All-Time Rankings</p>
				</div>
				<ShowdownLeaderboard movies={SHOWDOWN_MOVIES} votes={votes} />
				<div className="showdown-actions">
					<button className="showdown-btn showdown-btn-primary" onClick={() => setShowLeaderboard(false)}>
						Back to Showdown
					</button>
					<button className="showdown-btn showdown-btn-danger" onClick={handleResetAll}>
						Reset All Votes
					</button>
				</div>
			</div>
		);
	}

	if (isFinished) {
		return (
			<div className="showdown-container">
				<div className="showdown-header">
					<h1 className="showdown-title">Showdown Complete!</h1>
					<p className="showdown-subtitle">All matchups decided. Here are the results:</p>
				</div>
				<ShowdownLeaderboard movies={SHOWDOWN_MOVIES} votes={votes} />
				<div className="showdown-actions">
					<button className="showdown-btn showdown-btn-primary" onClick={handlePlayAgain}>
						New Showdown
					</button>
					<button className="showdown-btn showdown-btn-secondary" onClick={() => setShowLeaderboard(true)}>
						View Full Leaderboard
					</button>
					<button className="showdown-btn showdown-btn-danger" onClick={handleResetAll}>
						Reset All Votes
					</button>
				</div>
			</div>
		);
	}

	const [movieA, movieB] = matchups[currentRound];
	const totalPairVotes = getTotalVotesForPair(movieA, movieB);
	const percentA = getVotePercent(movieA.id, totalPairVotes);
	const percentB = getVotePercent(movieB.id, totalPairVotes);

	return (
		<div className="showdown-container">
			<div className="showdown-header">
				<h1 className="showdown-title">Movie Showdown</h1>
				<p className="showdown-subtitle">
					Round {currentRound + 1} of {matchups.length} — Pick your winner!
				</p>
				<button className="showdown-btn showdown-btn-outline" onClick={() => setShowLeaderboard(true)}>
					View Leaderboard
				</button>
			</div>

			<div className="showdown-progress-bar">
				<div
					className="showdown-progress-fill"
					style={{ width: `${((currentRound) / matchups.length) * 100}%` }}
				/>
			</div>

			<div className={`showdown-arena ${animateIn ? 'showdown-fade-in' : 'showdown-fade-out'}`}>
				{/* Movie A */}
				<div
					className={`showdown-card ${voted && selectedId === movieA.id ? 'showdown-card-winner' : ''} ${voted && selectedId !== movieA.id ? 'showdown-card-loser' : ''}`}
					onClick={() => handleVote(movieA)}
				>
					<div className="showdown-poster-wrap">
						<img
							src={movieA.Poster}
							alt={movieA.Title}
							className="showdown-poster"
							onError={(e) => { e.target.src = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'; }}
						/>
						{voted && selectedId === movieA.id && (
							<div className="showdown-winner-badge">YOUR PICK</div>
						)}
					</div>
					<div className="showdown-card-info">
						<h3 className="showdown-movie-title">{movieA.Title}</h3>
						<span className="showdown-movie-year">{movieA.Year}</span>
						{voted && (
							<div className="showdown-vote-result">
								<div className="showdown-vote-bar-track">
									<div
										className="showdown-vote-bar-fill showdown-vote-bar-a"
										style={{ width: `${percentA}%` }}
									/>
								</div>
								<span className="showdown-vote-percent">{percentA}% ({getMovieVotes(movieA.id)} votes)</span>
							</div>
						)}
						{!voted && <button className="showdown-btn showdown-btn-vote">Vote</button>}
					</div>
				</div>

				{/* VS Divider */}
				<div className="showdown-vs">
					<span className="showdown-vs-text">VS</span>
				</div>

				{/* Movie B */}
				<div
					className={`showdown-card ${voted && selectedId === movieB.id ? 'showdown-card-winner' : ''} ${voted && selectedId !== movieB.id ? 'showdown-card-loser' : ''}`}
					onClick={() => handleVote(movieB)}
				>
					<div className="showdown-poster-wrap">
						<img
							src={movieB.Poster}
							alt={movieB.Title}
							className="showdown-poster"
							onError={(e) => { e.target.src = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'; }}
						/>
						{voted && selectedId === movieB.id && (
							<div className="showdown-winner-badge">YOUR PICK</div>
						)}
					</div>
					<div className="showdown-card-info">
						<h3 className="showdown-movie-title">{movieB.Title}</h3>
						<span className="showdown-movie-year">{movieB.Year}</span>
						{voted && (
							<div className="showdown-vote-result">
								<div className="showdown-vote-bar-track">
									<div
										className="showdown-vote-bar-fill showdown-vote-bar-b"
										style={{ width: `${percentB}%` }}
									/>
								</div>
								<span className="showdown-vote-percent">{percentB}% ({getMovieVotes(movieB.id)} votes)</span>
							</div>
						)}
						{!voted && <button className="showdown-btn showdown-btn-vote">Vote</button>}
					</div>
				</div>
			</div>

			{voted && (
				<div className="showdown-next-wrap">
					<button className="showdown-btn showdown-btn-primary showdown-btn-next" onClick={handleNext}>
						Next Matchup
					</button>
				</div>
			)}
		</div>
	);
};

export default MovieShowdown;
