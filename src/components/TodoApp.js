import React, { useState, useEffect } from 'react';

const TodoApp = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		const savedTodos = localStorage.getItem('todos');
		if (savedTodos) {
			setTodos(JSON.parse(savedTodos));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') return;

		const newTodo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
			createdAt: new Date().toISOString()
		};

		setTodos([...todos, newTodo]);
		setInputValue('');
	};

	const toggleTodo = (id) => {
		setTodos(todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		));
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	const clearCompleted = () => {
		setTodos(todos.filter(todo => !todo.completed));
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
		<div className="todo-app">
			<div className="todo-container">
				<h1 className="todo-title">Todo List</h1>

				<form onSubmit={addTodo} className="todo-form">
					<input
						type="text"
						className="todo-input"
						placeholder="What needs to be done?"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type="submit" className="add-btn">Add</button>
				</form>

				{todos.length > 0 && (
					<>
						<div className="filter-buttons">
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
								Active ({activeTodosCount})
							</button>
							<button
								className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
								onClick={() => setFilter('completed')}
							>
								Completed ({todos.length - activeTodosCount})
							</button>
						</div>

						<ul className="todo-list">
							{filteredTodos.map(todo => (
								<li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
										className="delete-btn"
										onClick={() => deleteTodo(todo.id)}
									>
										×
									</button>
								</li>
							))}
						</ul>

						<div className="todo-footer">
							<span className="todo-count">
								{activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
							</span>
							{todos.length > activeTodosCount && (
								<button className="clear-btn" onClick={clearCompleted}>
									Clear completed
								</button>
							)}
						</div>
					</>
				)}

				{todos.length === 0 && (
					<div className="empty-state">
						<p>No todos yet. Add one above!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TodoApp;
