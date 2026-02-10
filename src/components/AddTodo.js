import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim()) {
			onAdd(text);
			setText('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='add-todo-form'>
			<input
				type='text'
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder='Add a new todo...'
				className='todo-input'
			/>
			<button type='submit' className='btn-add-todo'>
				Add Todo
			</button>
		</form>
	);
};

export default AddTodo;
