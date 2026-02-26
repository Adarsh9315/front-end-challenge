import React from 'react';

const Loader = React.memo(() => {
	return (
		<div className='loader-container' role="status" aria-live="polite">
			<div className='spinner' aria-hidden="true"></div>
			<p className='loader-text'>Loading...</p>
		</div>
	);
});

Loader.displayName = 'Loader';

export default Loader;
