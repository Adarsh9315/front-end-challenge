import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim() !== '') {
			onAdd(inputValue);
			setInputValue('');
		}
	};

	return (
		<form className="add-todo-form" onSubmit={handleSubmit}>
			<input
				type="text"
				className="add-todo-input"
				placeholder="What needs to be done?"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button type="submit" className="add-todo-btn">
				Add Todo
			</button>
		</form>
	);
};

export default AddTodo;
