import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div className='col'>
			<h1 style={{
				fontSize: '1.8rem', 
				fontWeight: '700',
				color: '#fff',
				marginBottom: '0',
				letterSpacing: '-0.5px'
			}}>
				{props.heading}
			</h1>
		</div>
	);
};

export default MovieListHeading;
