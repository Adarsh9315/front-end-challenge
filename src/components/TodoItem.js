import React, { memo } from 'react';

const TodoItem = memo(({ todo, onToggle, onDelete }) => {
	return (
		<div className='todo-item d-flex align-items-center justify-content-between mb-3'>
			<div className='d-flex align-items-center flex-grow-1'>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className='mr-3 todo-checkbox'
					aria-label={`Toggle todo: ${todo.text}`}
				/>
				<span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
					{todo.text}
				</span>
			</div>
			<button
				className='btn btn-danger btn-sm'
				onClick={() => onDelete(todo.id)}
				aria-label={`Delete todo: ${todo.text}`}
			>
				Delete
			</button>
		</div>
	);
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;
