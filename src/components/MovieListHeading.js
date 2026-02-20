import React, { memo } from 'react';

const MovieListHeading = memo((props) => {
	return (
		<div className='col'>
			<h1>{props.heading}</h1>
		</div>
	);
});

MovieListHeading.displayName = 'MovieListHeading';

export default MovieListHeading;
