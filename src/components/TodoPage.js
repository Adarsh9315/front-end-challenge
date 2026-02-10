import React, { useState, useEffect } from 'react';
import './TodoPage.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all'); // all, active, completed

	// Load todos from localStorage on mount
	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
	}, []);

	// Save todos to localStorage whenever they change
	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') return;

		const newTodo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
			createdAt: new Date().toISOString()
		};

		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		setInputValue('');
	};

	const toggleTodo = (id) => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter(todo => todo.id !== id);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const clearCompleted = () => {
		const updatedTodos = todos.filter(todo => !todo.completed);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
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
		<div className="todo-page">
			<div className="todo-container">
				<h1 className="todo-title">My Todo List</h1>
				
				<form onSubmit={addTodo} className="todo-form">
					<input
						type="text"
						className="todo-input"
						placeholder="What needs to be done?"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type="submit" className="todo-add-btn">Add</button>
				</form>

				<div className="todo-filters">
					<button
						className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
						onClick={() => setFilter('all')}
					>
						All ({todos.length})
					</button>
					<button
						className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
						onClick={() => setFilter('active')}
					>
						Active ({activeTodosCount})
					</button>
					<button
						className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
						onClick={() => setFilter('completed')}
					>
						Completed ({completedTodosCount})
					</button>
				</div>

				<div className="todo-list">
					{filteredTodos.length === 0 ? (
						<div className="empty-state">
							{filter === 'all' && 'No todos yet. Add one above!'}
							{filter === 'active' && 'No active todos!'}
							{filter === 'completed' && 'No completed todos!'}
						</div>
					) : (
						filteredTodos.map(todo => (
							<div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
								<div className="todo-content">
									<input
										type="checkbox"
										className="todo-checkbox"
										checked={todo.completed}
										onChange={() => toggleTodo(todo.id)}
									/>
									<span className="todo-text">{todo.text}</span>
								</div>
								<button
									className="todo-delete-btn"
									onClick={() => deleteTodo(todo.id)}
								>
									×
								</button>
							</div>
						))
					)}
				</div>

				{completedTodosCount > 0 && (
					<div className="todo-footer">
						<button className="clear-completed-btn" onClick={clearCompleted}>
							Clear Completed ({completedTodosCount})
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default TodoPage;
