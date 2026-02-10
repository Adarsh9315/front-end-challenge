import React from 'react';

const SearchBox = ({ searchValue, setSearchValue }) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				type="search"
				value={searchValue}
				onChange={(event) => setSearchValue(event.target.value)}
				placeholder='Type to search movies...'
				aria-label="Search for movies"
			/>
		</div>
	);
};

export default SearchBox;
