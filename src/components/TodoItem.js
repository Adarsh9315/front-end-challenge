import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
	return (
		<div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
			<div className='d-flex align-items-center flex-grow-1' style={{ gap: '14px', minWidth: 0 }}>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className='todo-checkbox'
				/>
				<span className={`todo-text ${todo.completed ? 'done' : ''}`}>
					{todo.text}
				</span>
			</div>
			<button
				className='todo-delete-btn'
				onClick={() => onDelete(todo.id)}
			>
				Delete
			</button>
		</div>
	);
};

export default TodoItem;
