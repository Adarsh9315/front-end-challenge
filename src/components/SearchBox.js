import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				style={{
					backgroundColor: '#1a1a1a',
					border: '1px solid #333',
					color: '#fff',
					padding: '12px 16px',
					borderRadius: '8px',
					fontSize: '1rem'
				}}
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Search movies...'
			></input>
		</div>
	);
};

export default SearchBox;
