import React from 'react';

const MovieList = React.memo(({ movies, handleNominationClick, nominationComponent, isRemoveAction = false }) => {
	const NominationComponent = nominationComponent;
	const defaultPoster = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';
	
	return (
		<>
			{movies.map((movie) => (
				<div className='image-container justify-content-start m-3' key={movie.imdbID}>
					<img 
						src={movie.Poster !== "N/A" ? movie.Poster : defaultPoster} 
						className='movie-poster'
						alt={`${movie.Title} poster`}
						loading='lazy'
					/>
					<div className='movie-title mt-2'>
						{movie.Title}
					</div>
					<div className='movie-year mt-2'>
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
						aria-label={`${isRemoveAction ? 'Remove' : 'Add'} nomination for ${movie.Title}`}
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
