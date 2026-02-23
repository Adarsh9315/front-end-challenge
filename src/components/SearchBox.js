import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col-12 col-sm-6 col-md-5 col-lg-4 ml-auto'>
			<input
				className='form-control'
				style={{
					backgroundColor: '#222',
					border: '1px solid #333',
					color: '#fff',
					padding: '12px 16px',
					borderRadius: '8px',
					fontSize: '1rem'
				}}
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Search for movies...'
			></input>
		</div>
	);
};

export default SearchBox;
