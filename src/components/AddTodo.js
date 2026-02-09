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
		<form onSubmit={handleSubmit} className='d-flex'>
			<input
				type='text'
				className='form-control form-control-lg'
				placeholder='Add a new todo...'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				style={{
					backgroundColor: '#2d2d2d',
					color: '#ffffff',
					border: '1px solid #444',
					marginRight: '10px'
				}}
			/>
			<button
				type='submit'
				className='btn btn-primary btn-lg'
				style={{
					backgroundColor: '#e50914',
					border: 'none',
					padding: '10px 30px'
				}}
			>
				Add Todo
			</button>
		</form>
	);
};

export default AddTodo;
