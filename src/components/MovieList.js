import React, { memo, useState } from 'react';

const MovieItem = memo(({ movie, handleNominationClick, NominationComponent }) => {
	const [imageError, setImageError] = useState(false);
	const defaultPoster = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';
	const posterSrc = movie.Poster !== "N/A" && !imageError ? movie.Poster : defaultPoster;

	return (
		<div className='image-container justify-content-start m-3' key={movie.imdbID}>
			<img 
				src={posterSrc}
				className='movie-poster'
				alt={movie.Title}
				loading='lazy'
				onError={() => setImageError(true)}
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
			>
				<NominationComponent />
			</div>
		</div>
	);
});

MovieItem.displayName = 'MovieItem';

const MovieList = memo((props) => {
	const NominationComponent = props.nominationComponent;
	
	return (
		<>
			{props.movies.map((movie) => (
				<MovieItem
					key={movie.imdbID}
					movie={movie}
					handleNominationClick={props.handleNominationClick}
					NominationComponent={NominationComponent}
				/>
			))}
		</>
	);
});

MovieList.displayName = 'MovieList';

export default MovieList;
