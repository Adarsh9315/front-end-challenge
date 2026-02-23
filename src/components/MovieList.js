import React from 'react';

const MovieList = (props) => {
	const NominationComponent = props.nominationComponent;
	
	if (!props.movies || props.movies.length === 0) {
		return null;
	}
	
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container justify-content-start' key={movie.imdbID || index} style={{ minWidth: '200px', maxWidth: '220px' }}>
					<img 
						src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} 
						alt={movie.Title}
						loading="lazy"
					/>
					<div className='movie-title' title={movie.Title}>
						{movie.Title}
					</div>
					<div className='movie-year'>
						{movie.Year}
					</div>
					<div onClick={() => props.handleNominationClick(movie)}>
						<NominationComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
