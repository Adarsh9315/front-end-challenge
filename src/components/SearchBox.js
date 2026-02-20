import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			<div className='search-box'>
				<input
					className='form-control'
					value={props.value}
					onChange={(event) => props.setSearchValue(event.target.value)}
					placeholder='Type to search movies...'
				></input>
			</div>
		</div>
	);
};

export default SearchBox;
