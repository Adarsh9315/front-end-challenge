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
		<form className='add-todo' onSubmit={handleSubmit}>
			<input
				type='text'
				className='add-todo__input'
				placeholder='Add a new todo...'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button type='submit' className='add-todo__btn'>
				Add Todo
			</button>
		</form>
	);
};

export default AddTodo;
