import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
	if (todos.length === 0) {
		return (
			<div className='empty-todos'>
				<p>No todos yet. Add one to get started!</p>
			</div>
		);
	}

	return (
		<div className='todo-list'>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</div>
	);
};

export default TodoList;
