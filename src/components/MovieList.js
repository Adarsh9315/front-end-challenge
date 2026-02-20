import React from 'react';

const MovieList = (props) => {
	const NominationComponent = props.nominationComponent;
	
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container justify-content-start m-3' key={index}>
					<img src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} alt='movie'></img>
					<div style={{padding: '12px'}}>
						<div style={{
							width: '200px',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							fontWeight: '600',
							fontSize: '0.95rem',
							color: '#fff',
							marginBottom: '4px'
						}}>
							{movie.Title}
						</div>
						<div style={{color: '#888', fontSize: '0.85rem'}}>
							{movie.Year}
						</div>
						<div
							onClick={() => props.handleNominationClick(movie)}
							style={{marginTop: '8px'}}
						>
							<NominationComponent />
						</div>
					</div>

				</div>
			))}
		</>
	);
};

export default MovieList;
