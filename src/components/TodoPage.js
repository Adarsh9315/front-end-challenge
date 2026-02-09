import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import '../TodoPage.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = (text) => {
		if (text.trim()) {
			const newTodo = {
				id: Date.now(),
				text: text,
				completed: false,
				createdAt: new Date().toISOString()
			};
			const newTodos = [...todos, newTodo];
			setTodos(newTodos);
			saveToLocalStorage(newTodos);
		}
	};

	const toggleTodo = (id) => {
		const newTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const editTodo = (id, newText) => {
		const newTodos = todos.map(todo =>
			todo.id === id ? { ...todo, text: newText } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const clearCompleted = () => {
		const newTodos = todos.filter(todo => !todo.completed);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const getFilteredTodos = () => {
		switch (filter) {
			case 'active':
				return todos.filter(todo => !todo.completed);
			case 'completed':
				return todos.filter(todo => todo.completed);
			default:
				return todos;
		}
	};

	const filteredTodos = getFilteredTodos();
	const activeTodosCount = todos.filter(todo => !todo.completed).length;

	return (
		<div className="todo-container">
			<div className="todo-header">
				<h1>My Todo List</h1>
				<p className="todo-stats">
					{activeTodosCount} {activeTodosCount === 1 ? 'task' : 'tasks'} remaining
				</p>
			</div>

			<TodoInput onAddTodo={addTodo} />

			<div className="todo-filters">
				<button
					className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
					onClick={() => setFilter('all')}
				>
					All
				</button>
				<button
					className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
					onClick={() => setFilter('active')}
				>
					Active
				</button>
				<button
					className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
					onClick={() => setFilter('completed')}
				>
					Completed
				</button>
			</div>

			<div className="todo-list">
				{filteredTodos.length === 0 ? (
					<p className="empty-message">
						{filter === 'completed'
							? 'No completed tasks yet'
							: filter === 'active'
							? 'No active tasks. Great job!'
							: 'No tasks yet. Add one above!'}
					</p>
				) : (
					filteredTodos.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onToggle={toggleTodo}
							onDelete={deleteTodo}
							onEdit={editTodo}
						/>
					))
				)}
			</div>

			{todos.filter(todo => todo.completed).length > 0 && (
				<div className="todo-footer">
					<button className="clear-btn" onClick={clearCompleted}>
						Clear Completed
					</button>
				</div>
			)}
		</div>
	);
};

export default TodoPage;
