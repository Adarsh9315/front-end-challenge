import React, { useState, useEffect } from 'react';
import '../App.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all');

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
			text: inputValue.trim(),
			completed: false,
			createdAt: new Date().toISOString()
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

	const clearCompleted = () => {
		const newTodos = todos.filter(todo => !todo.completed);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const filteredTodos = todos.filter(todo => {
		if (filter === 'active') return !todo.completed;
		if (filter === 'completed') return todo.completed;
		return true;
	});

	const remainingCount = todos.filter(todo => !todo.completed).length;

	return (
		<div className="container-fluid todo-app">
			<div className="row justify-content-center mt-4">
				<div className="col-md-8 col-lg-6">
					<h1 className="text-center mb-4">Todo List</h1>
					
					{/* Add Todo Form */}
					<form onSubmit={addTodo} className="mb-4">
						<div className="input-group">
							<input
								type="text"
								className="form-control todo-input"
								placeholder="What needs to be done?"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<div className="input-group-append">
								<button className="btn btn-primary" type="submit">
									Add
								</button>
							</div>
						</div>
					</form>

					{/* Filter Buttons */}
					<div className="btn-group mb-3 d-flex" role="group">
						<button
							className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
							onClick={() => setFilter('all')}
						>
							All ({todos.length})
						</button>
						<button
							className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
							onClick={() => setFilter('active')}
						>
							Active ({remainingCount})
						</button>
						<button
							className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
							onClick={() => setFilter('completed')}
						>
							Completed ({todos.length - remainingCount})
						</button>
					</div>

					{/* Todo List */}
					<ul className="list-group todo-list">
						{filteredTodos.length === 0 ? (
							<li className="list-group-item text-center todo-item">
								{filter === 'all' ? 'No todos yet. Add one above!' : `No ${filter} todos.`}
							</li>
						) : (
							filteredTodos.map(todo => (
								<li
									key={todo.id}
									className={`list-group-item d-flex justify-content-between align-items-center todo-item ${todo.completed ? 'completed' : ''}`}
								>
									<div className="d-flex align-items-center flex-grow-1">
										<input
											type="checkbox"
											className="mr-3 todo-checkbox"
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
										/>
										<span className={`todo-text ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
											{todo.text}
										</span>
									</div>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => deleteTodo(todo.id)}
									>
										Delete
									</button>
								</li>
							))
						)}
					</ul>

					{/* Footer */}
					{todos.length > 0 && (
						<div className="d-flex justify-content-between align-items-center mt-3 todo-footer">
							<span>{remainingCount} item{remainingCount !== 1 ? 's' : ''} left</span>
							{todos.some(todo => todo.completed) && (
								<button
									className="btn btn-outline-danger btn-sm"
									onClick={clearCompleted}
								>
									Clear Completed
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
