import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
	if (todos.length === 0) {
		return (
			<div className='text-center mt-5' style={{ opacity: 0.6 }}>
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
				/>
			))}
		</div>
	);
};

export default TodoList;
