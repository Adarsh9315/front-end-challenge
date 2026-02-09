import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
	if (todos.length === 0) {
		return (
			<div className='text-center text-white-50 mt-5'>
				<p>No todos yet. Add one to get started!</p>
			</div>
		);
	}

	return (
		<div className='list-group'>
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
