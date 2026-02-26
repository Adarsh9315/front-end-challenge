import React from 'react';

const SearchBox = React.memo((props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.searchValue}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search movies...'
				aria-label="Search for movies"
				type="search"
			/>
		</div>
	);
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
