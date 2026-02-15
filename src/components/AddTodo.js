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
						backgroundColor: '#2a2a2a',
						color: '#ffffff',
						border: '1px solid #444'
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
