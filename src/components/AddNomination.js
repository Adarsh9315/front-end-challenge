import React, { memo } from 'react';

const AddNomination = memo(() => {
	return (
		<button className='btn-handler' type='button'>
			Add Nomination
		</button>
	);
});

AddNomination.displayName = 'AddNomination';

export default AddNomination;
