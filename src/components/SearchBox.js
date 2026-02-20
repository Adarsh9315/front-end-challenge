import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='search-wrapper'>
			<input
				className='search-input'
				value={props.searchValue}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Search movies...'
			/>
		</div>
	);
};

export default SearchBox;
