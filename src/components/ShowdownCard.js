import React, { useState } from 'react';

const ShowdownCard = ({ movie, onVote, voteCount, side }) => {
	const [animating, setAnimating] = useState(false);

	const handleVote = () => {
		setAnimating(true);
		onVote(movie);
		setTimeout(() => setAnimating(false), 600);
	};

	const defaultPoster = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';

	return (
		<div
			className={`showdown-card showdown-card-${side} ${animating ? 'showdown-card-voted' : ''}`}
			onClick={handleVote}
		>
			<div className='showdown-card-glow'></div>
			<div className='showdown-card-inner'>
				<img
					src={movie.Poster !== 'N/A' ? movie.Poster : defaultPoster}
					alt={movie.Title}
					className='showdown-poster'
				/>
				<div className='showdown-card-info'>
					<h3 className='showdown-title'>{movie.Title}</h3>
					<p className='showdown-year'>{movie.Year}</p>
					<div className='showdown-vote-count'>
						<span className='showdown-fire'>{voteCount >= 10 ? '🔥' : '⚡'}</span>
						<span className='showdown-votes'>{voteCount}</span>
						<span className='showdown-vote-label'>votes</span>
					</div>
					<button className='showdown-vote-btn'>
						{animating ? '💥 VOTED!' : '👊 FIGHT FOR THIS'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShowdownCard;
