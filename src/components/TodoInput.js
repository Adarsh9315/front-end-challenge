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
		<form onSubmit={handleSubmit} className="todo-input-form">
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="What needs to be done?"
				className="todo-input"
			/>
			<button type="submit" className="add-btn">
				Add Task
			</button>
		</form>
	);
};

export default TodoInput;
