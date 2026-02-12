import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
	if (todos.length === 0) {
		return (
			<div className="todo-list__empty">
				<p className="text-muted text-center py-4">
					No todos found. Add one above to get started!
				</p>
			</div>
		);
	}

	return (
		<div className="todo-list">
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default TodoList;
