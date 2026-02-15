import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
	return (
		<div className='todo-item d-flex align-items-center justify-content-between mb-3'>
			<div className='d-flex align-items-center flex-grow-1'>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className='todo-checkbox'
				/>
				<span
					className={`todo-text ml-3 ${todo.completed ? 'todo-completed' : ''}`}
				>
					{todo.text}
				</span>
			</div>
			<button
				className='btn btn-danger btn-sm'
				onClick={() => onDelete(todo.id)}
			>
				Delete
			</button>
		</div>
	);
};

export default TodoItem;
