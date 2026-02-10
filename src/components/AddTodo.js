import React, { useState } from 'react';

const AddTodo = ({ onAddTodo }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddTodo(inputValue);
		setInputValue('');
	};

	return (
		<form className='add-todo-form' onSubmit={handleSubmit}>
			<input
				type='text'
				className='todo-input'
				placeholder='Add a new todo...'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button type='submit' className='btn btn-add'>
				Add
			</button>
		</form>
	);
};

export default AddTodo;
