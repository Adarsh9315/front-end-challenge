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
				placeholder='Add a new todo...'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button type='submit'>
				Add
			</button>
		</form>
	);
};

export default AddTodo;
