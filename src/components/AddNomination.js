import React from 'react';

const AddNomination = React.memo(() => {
	return (
		<button className='btn-handler' type='button'>Add Nomination</button>
	);
});

AddNomination.displayName = 'AddNomination';

export default AddNomination;
