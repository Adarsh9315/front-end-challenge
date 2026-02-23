import React from 'react';
import TodoItem from './TodoItem';

const TodoList = React.memo(({ todos, onToggle, onDelete }) => {
	if (todos.length === 0) {
		return (
			<div className='text-center mt-5 empty-todos'>
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
});

TodoList.displayName = 'TodoList';

export default TodoList;
