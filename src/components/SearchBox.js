import React, { useState, useEffect } from 'react';

const SearchBox = React.memo(({ searchValue, setSearchValue }) => {
	const [localValue, setLocalValue] = useState(searchValue);

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchValue(localValue);
		}, 500); // 500ms debounce

		return () => clearTimeout(timer);
	}, [localValue, setSearchValue]);

	useEffect(() => {
		setLocalValue(searchValue);
	}, [searchValue]);

	return (
		<div className='col col-sm-4'>
			<input
				className='form-control search-input'
				value={localValue}
				onChange={(event) => setLocalValue(event.target.value)}
				placeholder='Type to search movies...'
			></input>
		</div>
	);
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
