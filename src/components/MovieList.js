import React from 'react';

const MovieList = React.memo((props) => {
	const NominationComponent = props.nominationComponent;
	
	return (
		<>
			{props.movies.map((movie) => (
				<div className='image-container justify-content-start m-3' key={movie.imdbID}>
					<img 
						src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} 
						className="movie-poster"
						alt={`${movie.Title} (${movie.Year})`}
						loading="lazy"
					/>
					<div className='movie-title mt-2'>
						{movie.Title}
					</div>
					<div className='movie-year mt-2'>
						{movie.Year}
					</div>
					<div
						onClick={() => props.handleNominationClick(movie)}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								props.handleNominationClick(movie);
							}
						}}
						aria-label={`${props.actionType || 'Toggle'} nomination for ${movie.Title}`}
					>
						<NominationComponent />
					</div>

				</div>
			))}
		</>
	);
});

MovieList.displayName = 'MovieList';

export default MovieList;
