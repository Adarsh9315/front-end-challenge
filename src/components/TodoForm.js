import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
	const [input, setInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.trim() !== '') {
			onAdd(input);
			setInput('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="todo-form mb-4">
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="What needs to be done?"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<div className="input-group-append">
					<button className="btn btn-primary" type="submit">
						Add Todo
					</button>
				</div>
			</div>
		</form>
	);
};

export default TodoForm;
