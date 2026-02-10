import React, { useState, useEffect } from 'react';
import './Todo.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoApp = () => {
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
		if (text.trim() === '') return;
		
		const newTodo = {
			id: Date.now(),
			text: text,
			completed: false,
			createdAt: new Date().toISOString()
		};
		
		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
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
	const completedTodosCount = todos.filter(todo => todo.completed).length;

	return (
		<div className='container-fluid todo-app'>
			<div className='todo-container'>
				<h1 className='todo-title'>Todo App</h1>
				
				<TodoInput onAddTodo={addTodo} />

				<div className='todo-stats'>
					<span>{activeTodosCount} active</span>
					<span>{completedTodosCount} completed</span>
					<span>{todos.length} total</span>
				</div>

				<div className='todo-filters'>
					<button
						className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
						onClick={() => setFilter('all')}
					>
						All
					</button>
					<button
						className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
						onClick={() => setFilter('active')}
					>
						Active
					</button>
					<button
						className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
						onClick={() => setFilter('completed')}
					>
						Completed
					</button>
				</div>

				<div className='todo-list'>
					{filteredTodos.length === 0 ? (
						<div className='empty-state'>
							{filter === 'all' && 'No todos yet. Add one above!'}
							{filter === 'active' && 'No active todos!'}
							{filter === 'completed' && 'No completed todos!'}
						</div>
					) : (
						filteredTodos.map(todo => (
							<TodoItem
								key={todo.id}
								todo={todo}
								onToggle={toggleTodo}
								onDelete={deleteTodo}
							/>
						))
					)}
				</div>

				{completedTodosCount > 0 && (
					<button className='clear-completed-btn' onClick={clearCompleted}>
						Clear Completed ({completedTodosCount})
					</button>
				)}
			</div>
		</div>
	);
};

export default TodoApp;
