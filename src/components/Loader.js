import React, { memo } from 'react';

const Loader = memo(() => {
	return (
		<div className='loader-container' role='status' aria-live='polite'>
			<div className='spinner' aria-hidden='true'></div>
			<p className='loader-text'>Loading...</p>
		</div>
	);
});

Loader.displayName = 'Loader';

export default Loader;
