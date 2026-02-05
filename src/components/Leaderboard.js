import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
	const [winners, setWinners] = useState([]);
	const [sortBy, setSortBy] = useState('wins');

	useEffect(() => {
		loadLeaderboard();
	}, []);

	const loadLeaderboard = () => {
		const showdownHistory = JSON.parse(localStorage.getItem('showdownHistory') || '[]');
		
		// Count wins for each movie
		const winCounts = {};
		
		showdownHistory.forEach(showdown => {
			const winnerId = showdown.winner.imdbID;
			if (!winCounts[winnerId]) {
				winCounts[winnerId] = {
					movie: showdown.winner,
					wins: 0,
					lastWin: showdown.timestamp
				};
			}
			winCounts[winnerId].wins += 1;
			winCounts[winnerId].lastWin = showdown.timestamp;
		});

		// Convert to array and sort
		const leaderboardArray = Object.values(winCounts);
		leaderboardArray.sort((a, b) => b.wins - a.wins);
		
		setWinners(leaderboardArray);
	};

	const clearLeaderboard = () => {
		if (window.confirm('Are you sure you want to clear the leaderboard?')) {
			localStorage.removeItem('showdownHistory');
			setWinners([]);
		}
	};

	const getMedalEmoji = (index) => {
		if (index === 0) return '🥇';
		if (index === 1) return '🥈';
		if (index === 2) return '🥉';
		return `#${index + 1}`;
	};

	return (
		<div className="leaderboard-container">
			<div className="leaderboard-header">
				<h1 className="leaderboard-title">🏆 Movie Leaderboard</h1>
				<p className="leaderboard-subtitle">Top movies based on showdown wins</p>
			</div>

			{winners.length > 0 ? (
				<>
					<div className="leaderboard-actions">
						<button onClick={clearLeaderboard} className="clear-btn">
							Clear Leaderboard
						</button>
					</div>

					<div className="leaderboard-list">
						{winners.map((entry, index) => (
							<div key={entry.movie.imdbID} className={`leaderboard-item rank-${index + 1}`}>
								<div className="rank-badge">
									{getMedalEmoji(index)}
								</div>
								<div className="movie-poster-small">
									<img 
										src={entry.movie.Poster !== "N/A" ? entry.movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`}
										alt={entry.movie.Title}
									/>
								</div>
								<div className="leaderboard-info">
									<h3 className="leaderboard-movie-title">{entry.movie.Title}</h3>
									<p className="leaderboard-movie-year">{entry.movie.Year}</p>
								</div>
								<div className="wins-badge">
									<span className="wins-count">{entry.wins}</span>
									<span className="wins-label">{entry.wins === 1 ? 'Win' : 'Wins'}</span>
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<div className="no-leaderboard">
					<p>No showdown results yet!</p>
					<p>Start voting in the Movie Showdown to see winners here.</p>
				</div>
			)}
		</div>
	);
};

export default Leaderboard;
