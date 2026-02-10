import React from 'react';

const MovieList = ({ movies, handleNominationClick, nominationComponent: NominationComponent }) => {
	if (!movies || movies.length === 0) {
		return null;
	}

	return (
		<>
			{movies.map((movie) => (
				<div className='image-container justify-content-start m-3' key={movie.imdbID}>
					<img 
						src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} 
						style={{height: '40vh'}} 
						alt={`${movie.Title} poster`}
						loading="lazy"
					/>
					<div className='mt-2' style={{width: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
						{movie.Title}
					</div>
					<div className='mt-2'>
						{movie.Year}
					</div>
					<div
						onClick={() => handleNominationClick(movie)}
						role="button"
						tabIndex={0}
						onKeyPress={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								handleNominationClick(movie);
							}
						}}
					>
						<NominationComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
