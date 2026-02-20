import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div className='col'>
			<h1 style={{
				fontSize: '1.8rem',
				fontWeight: '700',
				color: '#fff',
				margin: 0,
				padding: '10px 0'
			}}>{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading;
