import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='search-box'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search movies...'
			></input>
		</div>
	);
};

export default SearchBox;
