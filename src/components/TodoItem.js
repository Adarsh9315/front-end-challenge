import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
	return (
		<div className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
			<div className="todo-item__content">
				<input
					type="checkbox"
					className="todo-item__checkbox"
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
				/>
				<span className={`todo-item__text ${todo.completed ? 'text-muted' : ''}`}>
					{todo.text}
				</span>
			</div>
			<button
				className="btn btn-sm btn-outline-danger todo-item__delete"
				onClick={() => onDelete(todo.id)}
				aria-label="Delete todo"
			>
				×
			</button>
		</div>
	);
};

export default TodoItem;
