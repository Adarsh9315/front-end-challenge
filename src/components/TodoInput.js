import React, { useState } from 'react';

const TodoInput = ({ onAdd }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim()) {
			onAdd(inputValue);
			setInputValue('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='todo-input-form mb-4'>
			<div className='input-group'>
				<input
					type='text'
					className='form-control todo-input'
					placeholder='Add a new todo...'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<div className='input-group-append'>
					<button className='btn btn-primary' type='submit'>
						Add
					</button>
				</div>
			</div>
		</form>
	);
};

export default TodoInput;
