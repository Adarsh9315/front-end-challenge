import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
	return (
		<div
			className='list-group-item d-flex justify-content-between align-items-center mb-2'
			style={{
				backgroundColor: '#2d2d2d',
				border: '1px solid #444',
				borderRadius: '5px'
			}}
		>
			<div className='d-flex align-items-center' style={{ flex: 1 }}>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className='mr-3'
					style={{
						width: '20px',
						height: '20px',
						cursor: 'pointer'
					}}
				/>
				<span
					style={{
						color: todo.completed ? '#888' : '#ffffff',
						textDecoration: todo.completed ? 'line-through' : 'none',
						fontSize: '1.1rem',
						flex: 1
					}}
				>
					{todo.text}
				</span>
			</div>
			<button
				onClick={() => onDelete(todo.id)}
				className='btn btn-danger btn-sm ml-3'
				style={{
					backgroundColor: '#e50914',
					border: 'none',
					padding: '5px 15px'
				}}
			>
				Delete
			</button>
		</div>
	);
};

export default TodoItem;
