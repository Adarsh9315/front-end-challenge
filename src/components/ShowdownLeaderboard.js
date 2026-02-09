import React from 'react';

const RANK_STYLES = {
	0: { badge: '1st', className: 'showdown-rank-gold' },
	1: { badge: '2nd', className: 'showdown-rank-silver' },
	2: { badge: '3rd', className: 'showdown-rank-bronze' },
};

const ShowdownLeaderboard = ({ movies, votes }) => {
	const sorted = [...movies]
		.map((m) => ({ ...m, voteCount: votes[m.id] || 0 }))
		.sort((a, b) => b.voteCount - a.voteCount);

	const maxVotes = sorted.length > 0 ? sorted[0].voteCount : 0;

	return (
		<div className="showdown-leaderboard">
			<h2 className="showdown-leaderboard-title">Leaderboard</h2>
			<div className="showdown-leaderboard-list">
				{sorted.map((movie, index) => {
					const rankInfo = RANK_STYLES[index];
					const barWidth = maxVotes > 0 ? (movie.voteCount / maxVotes) * 100 : 0;

					return (
						<div
							key={movie.id}
							className={`showdown-leaderboard-row ${rankInfo ? rankInfo.className : ''}`}
						>
							<div className="showdown-leaderboard-rank">
								{rankInfo ? (
									<span className="showdown-leaderboard-badge">{rankInfo.badge}</span>
								) : (
									<span className="showdown-leaderboard-num">#{index + 1}</span>
								)}
							</div>
							<img
								src={movie.Poster}
								alt={movie.Title}
								className="showdown-leaderboard-thumb"
								onError={(e) => { e.target.src = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'; }}
							/>
							<div className="showdown-leaderboard-info">
								<div className="showdown-leaderboard-movie-name">
									{movie.Title} <span className="showdown-leaderboard-year">({movie.Year})</span>
								</div>
								<div className="showdown-leaderboard-bar-track">
									<div
										className="showdown-leaderboard-bar-fill"
										style={{ width: `${barWidth}%` }}
									/>
								</div>
							</div>
							<div className="showdown-leaderboard-votes">
								{movie.voteCount} vote{movie.voteCount !== 1 ? 's' : ''}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ShowdownLeaderboard;
