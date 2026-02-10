import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
	if (todos.length === 0) {
		return (
			<div className='todo-empty'>
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
					onToggle={onToggleTodo}
					onDelete={onDeleteTodo}
				/>
			))}
		</div>
	);
};

export default TodoList;
