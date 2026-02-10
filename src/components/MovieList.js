import React from 'react';

const MovieList = ({ movies, handleNominationClick, nominationComponent: NominationComponent, nomination = [] }) => {
	if (!movies || movies.length === 0) {
		return null;
	}

	return (
		<>
			{movies.map((movie) => {
				const isNominated = nomination.some(n => n.imdbID === movie.imdbID);
				const defaultPoster = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';
				
				return (
					<div 
						className='image-container justify-content-start m-3' 
						key={movie.imdbID}
						role="article"
						aria-label={`Movie: ${movie.Title} (${movie.Year})`}
					>
						<img 
							src={movie.Poster !== "N/A" ? movie.Poster : defaultPoster} 
							className="movie-poster"
							alt={`Poster for ${movie.Title}`}
							loading="lazy"
						/>
						<div className='movie-title mt-2'>
							{movie.Title}
						</div>
						<div className='movie-year mt-2'>
							{movie.Year}
						</div>
						<div
							onClick={() => handleNominationClick(movie)}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									handleNominationClick(movie);
								}
							}}
							aria-disabled={isNominated}
						>
							<NominationComponent isNominated={isNominated} />
						</div>
					</div>
				);
			})}
		</>
	);
};

export default MovieList;
