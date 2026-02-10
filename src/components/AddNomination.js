import React from 'react';

const AddNomination = ({ isNominated = false }) => {
	return (
		<button 
			className='btn-handler btn-add' 
			disabled={isNominated}
			aria-label="Add movie to nominations"
		>
			{isNominated ? 'Already Nominated' : 'Add Nomination'}
		</button>
	);
};

export default AddNomination;
