import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
	if (!todos || todos.length === 0) {
		return (
			<div className='text-center' style={{ padding: '40px', opacity: 0.6 }}>
				<h5>No todos yet. Add one above to get started!</h5>
			</div>
		);
	}

	return (
		<div className='todo-list'>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					toggleTodo={toggleTodo}
					deleteTodo={deleteTodo}
				/>
			))}
		</div>
	);
};

export default TodoList;
