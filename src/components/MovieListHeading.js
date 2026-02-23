import React from 'react';

const MovieListHeading = React.memo(({ heading }) => {
	return (
		<div className='col'>
			<h1>{heading}</h1>
		</div>
	);
});

MovieListHeading.displayName = 'MovieListHeading';

export default MovieListHeading;
