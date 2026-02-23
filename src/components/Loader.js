import React from 'react';

const Loader = React.memo(() => {
	return (
		<div className='loader-container'>
			<div className='spinner' aria-label='Loading'></div>
			<p className='loader-text'>Loading...</p>
		</div>
	);
});

Loader.displayName = 'Loader';

export default Loader;
