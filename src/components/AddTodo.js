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
			<div className='input-group'>
				<input
					type='text'
					className='form-control'
					placeholder='Add a new todo...'
					value={text}
					onChange={(e) => setText(e.target.value)}
					style={{
						backgroundColor: 'var(--input-bg)',
						color: 'var(--input-text)',
						border: '1px solid var(--input-border)'
					}}
				/>
				<div className='input-group-append'>
					<button className='btn btn-primary' type='submit'>
						Add Todo
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddTodo;
