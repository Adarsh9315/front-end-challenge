import React from 'react';

const MovieListHeading = React.memo((props) => {
	return (
		<div className='col'>
			<h1>{props.heading}</h1>
		</div>
	);
});

MovieListHeading.displayName = 'MovieListHeading';

export default MovieListHeading;
