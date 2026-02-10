import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
	return (
		<div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
			<div className='todo-item-content'>
				<input
					type='checkbox'
					className='todo-checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
				/>
				<span className='todo-text' onClick={() => onToggle(todo.id)}>
					{todo.text}
				</span>
			</div>
			<button
				className='delete-btn'
				onClick={() => onDelete(todo.id)}
				aria-label='Delete todo'
			>
				×
			</button>
		</div>
	);
};

export default TodoItem;
