import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
	return (
		<div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
			<div 
				className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
				onClick={() => onToggle(todo.id)}
			>
				{todo.completed && '✓'}
			</div>
			<span className='todo-text'>{todo.text}</span>
			<button
				className='todo-delete-btn'
				onClick={() => onDelete(todo.id)}
			>
				✕
			</button>
		</div>
	);
};

export default TodoItem;
