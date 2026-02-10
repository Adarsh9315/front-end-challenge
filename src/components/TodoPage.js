import React, { useState, useEffect } from 'react';
import './TodoPage.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = () => {
		if (inputValue.trim() === '') return;

		const newTodo = {
			id: Date.now(),
			text: inputValue.trim(),
			completed: false,
			createdAt: new Date().toISOString(),
		};

		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		setInputValue('');
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

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	const completedCount = todos.filter(todo => todo.completed).length;
	const totalCount = todos.length;

	return (
		<div className="todo-page">
			<div className="todo-container">
				<h1 className="todo-title">Todo List</h1>
				
				<div className="todo-input-section">
					<input
						type="text"
						className="todo-input"
						placeholder="Add a new todo..."
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button className="todo-add-btn" onClick={addTodo}>
						Add
					</button>
				</div>

				{todos.length > 0 && (
					<div className="todo-stats">
						<span>{completedCount} of {totalCount} completed</span>
					</div>
				)}

				<div className="todo-list">
					{todos.length === 0 ? (
						<div className="todo-empty">
							<p>No todos yet. Add one to get started!</p>
						</div>
					) : (
						todos.map(todo => (
							<div
								key={todo.id}
								className={`todo-item ${todo.completed ? 'completed' : ''}`}
							>
								<input
									type="checkbox"
									className="todo-checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
								/>
								<span className="todo-text">{todo.text}</span>
								<button
									className="todo-delete-btn"
									onClick={() => deleteTodo(todo.id)}
									aria-label="Delete todo"
								>
									×
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
