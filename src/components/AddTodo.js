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
		<form onSubmit={handleSubmit} className='add-todo-form mb-4'>
			<div className='todo-input-group'>
				<input
					type='text'
					className='todo-input'
					placeholder='What needs to be done?'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button className='todo-add-btn' type='submit'>
					Add
				</button>
			</div>
		</form>
	);
};

export default AddTodo;
