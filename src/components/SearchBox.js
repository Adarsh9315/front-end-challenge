import React, { memo } from 'react';

const SearchBox = memo((props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control search-input'
				value={props.searchValue}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search movies...'
				aria-label='Search movies'
			/>
		</div>
	);
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
