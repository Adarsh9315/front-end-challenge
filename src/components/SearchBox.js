import React from 'react';

const SearchBox = React.memo(({ searchValue, setSearchValue }) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control search-input'
				type='search'
				value={searchValue}
				onChange={(event) => setSearchValue(event.target.value)}
				placeholder='Type to search movies...'
				aria-label='Search for movies'
			/>
		</div>
	);
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
