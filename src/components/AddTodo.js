import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
	const [input, setInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.trim()) {
			addTodo(input.trim());
			setInput('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='mb-4'>
			<div className='input-group'>
				<input
					type='text'
					className='form-control'
					placeholder='Add a new todo...'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					style={{
						backgroundColor: '#2a2a2a',
						border: '1px solid #444',
						color: '#fff',
						padding: '12px',
					}}
				/>
				<button
					className='btn btn-primary'
					type='submit'
					style={{
						backgroundColor: '#007bff',
						border: 'none',
						padding: '12px 24px',
					}}
				>
					Add
				</button>
			</div>
		</form>
	);
};

export default AddTodo;
