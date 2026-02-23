import React from 'react';

const AddNomination = React.memo(() => {
	return (
		<button className='btn-handler'>Add Nomination</button>
	);
});

AddNomination.displayName = 'AddNomination';

export default AddNomination;
