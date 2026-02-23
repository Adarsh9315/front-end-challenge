import React from 'react';

const MovieList = (props) => {
	const NominationComponent = props.nominationComponent;
	
	return (
		<>
			{props.movies.length === 0 && props.movies !== props.nomination ? (
				<div className='col-12 text-center' style={{padding: '40px', color: '#666'}}>
					<p style={{fontSize: '1.1rem'}}>No movies found</p>
				</div>
			) : (
				props.movies.map((movie, index) => (
					<div className='col-6 col-md-4 col-lg-3 col-xl-2' key={index}>
						<div className='image-container'>
							<img src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} alt='movie'></img>
							<div className='mt-2 movie-title'>
								{movie.Title}
							</div>
							<div className='movie-year'>
								{movie.Year}
							</div>
							<div
								onClick={() => props.handleNominationClick(movie)}
							>
								<NominationComponent />
							</div>
						</div>
					</div>
				))
			)}
		</>
	);
};

export default MovieList;
