import React, { useState, useEffect } from 'react';
import './TodoPage.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	// Load todos from localStorage on component mount
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

	// Add a new todo
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

	// Toggle todo completion status
	const toggleTodo = (id) => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	// Delete a todo
	const deleteTodo = (id) => {
		const updatedTodos = todos.filter(todo => todo.id !== id);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	// Clear all completed todos
	const clearCompleted = () => {
		const updatedTodos = todos.filter(todo => !todo.completed);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const activeTodos = todos.filter(todo => !todo.completed).length;
	const completedTodos = todos.filter(todo => todo.completed).length;

	return (
		<div className="todo-page">
			<div className="todo-container">
				<h1 className="todo-title">My Todo List</h1>
				
				<div className="todo-stats">
					<span className="stat-item">
						<span className="stat-label">Total:</span> {todos.length}
					</span>
					<span className="stat-item">
						<span className="stat-label">Active:</span> {activeTodos}
					</span>
					<span className="stat-item">
						<span className="stat-label">Completed:</span> {completedTodos}
					</span>
				</div>

				<form onSubmit={addTodo} className="todo-form">
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="What needs to be done?"
						className="todo-input"
					/>
					<button type="submit" className="todo-add-btn">
						Add Todo
					</button>
				</form>

				<div className="todo-list">
					{todos.length === 0 ? (
						<div className="empty-state">
							<p>No todos yet. Add one to get started!</p>
						</div>
					) : (
						todos.map(todo => (
							<div
								key={todo.id}
								className={`todo-item ${todo.completed ? 'completed' : ''}`}
							>
								<div className="todo-content">
									<input
										type="checkbox"
										checked={todo.completed}
										onChange={() => toggleTodo(todo.id)}
										className="todo-checkbox"
									/>
									<span className="todo-text">{todo.text}</span>
								</div>
								<button
									onClick={() => deleteTodo(todo.id)}
									className="todo-delete-btn"
								>
									Delete
								</button>
							</div>
						))
					)}
				</div>

				{completedTodos > 0 && (
					<div className="todo-actions">
						<button onClick={clearCompleted} className="clear-completed-btn">
							Clear Completed ({completedTodos})
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default TodoPage;
