import React, { useState } from 'react';

const AddTodo = React.memo(({ onAdd }) => {
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
					className='form-control todo-input'
					placeholder='Add a new todo...'
					value={text}
					onChange={(e) => setText(e.target.value)}
					aria-label='Add a new todo'
				/>
				<div className='input-group-append'>
					<button className='btn btn-primary' type='submit'>
						Add Todo
					</button>
				</div>
			</div>
		</form>
	);
});

AddTodo.displayName = 'AddTodo';

export default AddTodo;
