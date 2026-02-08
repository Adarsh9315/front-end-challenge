import React, { useState, useEffect } from 'react';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all'); // all, active, completed

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
	}, []);

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
	const activeCount = todos.filter(todo => !todo.completed).length;

	return (
		<div className="todo-container">
			<div className="todo-header">
				<h1>My Todo List</h1>
				<p className="todo-subtitle">Stay organized and productive</p>
			</div>

			<form onSubmit={addTodo} className="todo-form">
				<input
					type="text"
					className="todo-input"
					placeholder="What needs to be done?"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button type="submit" className="todo-add-btn">Add Todo</button>
			</form>

			<div className="todo-filters">
				<button
					className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
					onClick={() => setFilter('all')}
				>
					All ({todos.length})
				</button>
				<button
					className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
					onClick={() => setFilter('active')}
				>
					Active ({activeCount})
				</button>
				<button
					className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
					onClick={() => setFilter('completed')}
				>
					Completed ({todos.length - activeCount})
				</button>
			</div>

			<div className="todo-list">
				{filteredTodos.length === 0 ? (
					<div className="empty-state">
						<p>No todos {filter !== 'all' ? filter : 'yet'}!</p>
						{filter === 'all' && <p className="empty-hint">Add a new todo to get started</p>}
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
								Delete
							</button>
						</div>
					))
				)}
			</div>

			{todos.length > 0 && (
				<div className="todo-footer">
					<span className="todo-count">{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
					{todos.some(todo => todo.completed) && (
						<button className="clear-completed-btn" onClick={clearCompleted}>
							Clear Completed
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default TodoPage;
