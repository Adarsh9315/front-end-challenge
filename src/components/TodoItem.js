import React from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
	return (
		<div
			className='d-flex align-items-center mb-3 p-3'
			style={{
				backgroundColor: '#2a2a2a',
				borderRadius: '8px',
				border: '1px solid #444',
			}}
		>
			<input
				type='checkbox'
				checked={todo.completed}
				onChange={() => toggleTodo(todo.id)}
				style={{
					width: '20px',
					height: '20px',
					marginRight: '15px',
					cursor: 'pointer',
				}}
			/>
			<span
				style={{
					flex: 1,
					textDecoration: todo.completed ? 'line-through' : 'none',
					opacity: todo.completed ? 0.6 : 1,
					fontSize: '1.1em',
				}}
			>
				{todo.text}
			</span>
			<button
				onClick={() => deleteTodo(todo.id)}
				className='btn btn-sm btn-danger'
				style={{
					backgroundColor: '#dc3545',
					border: 'none',
				}}
			>
				Delete
			</button>
		</div>
	);
};

export default TodoItem;
