import React, { memo } from 'react';

const RemoveNominations = memo(() => {
	return (
		<button className='btn-handler' type='button'>
			Remove Nomination
		</button>
	);
});

RemoveNominations.displayName = 'RemoveNominations';

export default RemoveNominations;
