import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div>
			{props.subtitle && (
				<p className='section-heading-small'>{props.subtitle}</p>
			)}
			<h1 className='section-heading'>{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading;
