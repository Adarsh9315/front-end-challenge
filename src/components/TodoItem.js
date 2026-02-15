import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
	return (
		<div className='todo-item d-flex align-items-center justify-content-between mb-3'>
			<div className='d-flex align-items-center flex-grow-1'>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className='mr-3'
					style={{ width: '20px', height: '20px', cursor: 'pointer' }}
				/>
				<span
					style={{
						textDecoration: todo.completed ? 'line-through' : 'none',
						opacity: todo.completed ? 0.6 : 1,
						fontSize: '1.1em'
					}}
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
