import React from 'react';

const MovieList = React.memo(({ movies, handleNominationClick, nominationComponent: NominationComponent }) => {
	return (
		<>
			{movies.map((movie) => (
				<div className='image-container justify-content-start m-3' key={movie.imdbID}>
					<img 
						src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} 
						className='movie-poster'
						alt={movie.Title}
						loading='lazy'
					/>
					<div className='movie-title'>
						{movie.Title}
					</div>
					<div className='movie-year'>
						{movie.Year}
					</div>
					<div
						onClick={() => handleNominationClick(movie)}
						role='button'
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								handleNominationClick(movie);
							}
						}}
						aria-label={`${NominationComponent.displayName || 'Action'} for ${movie.Title}`}
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
