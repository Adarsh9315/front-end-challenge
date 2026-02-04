import React from 'react';

const MovieList = (props) => {
	const NominationComponent = props.nominationComponent;
	
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container justify-content-start m-3' key={index}>
					<img src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} style={{height: '40vh'}} alt='movie'></img>
					<div className='mt-2' style={{width: '250px',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
						{movie.Title}
					</div>
					<div className='mt-2'>
						{movie.Year}
					</div>
					<div
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
