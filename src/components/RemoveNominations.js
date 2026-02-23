import React from 'react';

const RemoveNominations = React.memo(() => {
	return (
		<button className='btn-handler'>Remove Nomination</button>
	);
});

RemoveNominations.displayName = 'RemoveNominations';

export default RemoveNominations;
