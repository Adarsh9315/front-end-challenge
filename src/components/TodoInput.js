import React, { useState } from 'react';

const TodoInput = ({ onAddTodo }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim()) {
			onAddTodo(inputValue);
			setInputValue('');
		}
	};

	return (
		<form className='todo-input-form' onSubmit={handleSubmit}>
			<input
				type='text'
				className='todo-input'
				placeholder='What needs to be done?'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button type='submit' className='add-todo-btn'>
				Add
			</button>
		</form>
	);
};

export default TodoInput;
