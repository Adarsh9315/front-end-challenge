import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
	return (
		<div className='todo-item'>
			<div className='d-flex align-items-center flex-grow-1'>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className='checkbox mr-3'
				/>
				<span
					style={{
						textDecoration: todo.completed ? 'line-through' : 'none',
						opacity: todo.completed ? 0.6 : 1,
						fontSize: '1rem'
					}}
				>
					{todo.text}
				</span>
			</div>
			<button
				className='delete-btn'
				onClick={() => onDelete(todo.id)}
			>
				✕
			</button>
		</div>
	);
};

export default TodoItem;
