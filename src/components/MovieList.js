import React from 'react';

const FALLBACK_POSTER = 'data:image/svg+xml,' + encodeURIComponent(
	'<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect fill="#1a1a2e" width="300" height="450"/><text fill="#444" font-family="sans-serif" font-size="48" x="150" y="210" text-anchor="middle">🎬</text><text fill="#555" font-family="sans-serif" font-size="14" x="150" y="250" text-anchor="middle">No Poster</text></svg>'
);

const MovieList = (props) => {
	const NominationComponent = props.nominationComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='movie-card' key={movie.imdbID || index}>
					<img
						src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER}
						className='movie-card-poster'
						alt={movie.Title}
						loading='lazy'
					/>
					<div className='movie-card-info'>
						<div className='movie-card-title' title={movie.Title}>
							{movie.Title}
						</div>
						<div className='movie-card-year'>
							{movie.Year}
						</div>
					</div>
					<div
						className='movie-card-action'
						onClick={() => props.handleNominationClick(movie)}
					>
						<NominationComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
