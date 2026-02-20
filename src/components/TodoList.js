import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
	if (todos.length === 0) {
		return (
			<div className='empty-state'>
				<span className='empty-state-emoji'>📝</span>
				<p className='empty-state-text'>No todos yet — add one above to get started</p>
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
