import React, { useState, useEffect } from 'react';
import './TodoApp.css';

const TodoApp = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState('');

	// Load todos from localStorage on mount
	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
	}, []);

	// Save todos to localStorage whenever todos change
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = () => {
		if (inputValue.trim() !== '') {
			const newTodo = {
				id: Date.now(),
				text: inputValue.trim(),
				completed: false,
				createdAt: new Date().toISOString()
			};
			setTodos([...todos, newTodo]);
			setInputValue('');
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	const toggleComplete = (id) => {
		setTodos(todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		));
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	const startEditing = (id, text) => {
		setEditingId(id);
		setEditValue(text);
	};

	const saveEdit = (id) => {
		if (editValue.trim() !== '') {
			setTodos(todos.map(todo =>
				todo.id === id ? { ...todo, text: editValue.trim() } : todo
			));
			setEditingId(null);
			setEditValue('');
		}
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditValue('');
	};

	const handleEditKeyPress = (e, id) => {
		if (e.key === 'Enter') {
			saveEdit(id);
		} else if (e.key === 'Escape') {
			cancelEdit();
		}
	};

	const clearCompleted = () => {
		setTodos(todos.filter(todo => !todo.completed));
	};

	const filteredTodos = todos.filter(todo => {
		if (filter === 'active') return !todo.completed;
		if (filter === 'completed') return todo.completed;
		return true;
	});

	const activeTodosCount = todos.filter(todo => !todo.completed).length;
	const completedTodosCount = todos.filter(todo => todo.completed).length;

	return (
		<div className="container-fluid todo-app">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<div className="todo-container">
						<h1 className="todo-title">Todo App</h1>
						
						{/* Add Todo Input */}
						<div className="input-group mb-4">
							<input
								type="text"
								className="form-control todo-input"
								placeholder="What needs to be done?"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<div className="input-group-append">
								<button
									className="btn btn-primary add-btn"
									onClick={addTodo}
									disabled={inputValue.trim() === ''}
								>
									Add
								</button>
							</div>
						</div>

						{/* Filter Buttons */}
						<div className="filter-buttons mb-3">
							<button
								className={`btn filter-btn ${filter === 'all' ? 'active' : ''}`}
								onClick={() => setFilter('all')}
							>
								All ({todos.length})
							</button>
							<button
								className={`btn filter-btn ${filter === 'active' ? 'active' : ''}`}
								onClick={() => setFilter('active')}
							>
								Active ({activeTodosCount})
							</button>
							<button
								className={`btn filter-btn ${filter === 'completed' ? 'active' : ''}`}
								onClick={() => setFilter('completed')}
							>
								Completed ({completedTodosCount})
							</button>
						</div>

						{/* Todo List */}
						<div className="todo-list">
							{filteredTodos.length === 0 ? (
								<div className="no-todos">
									{filter === 'all' && 'No todos yet. Add one above!'}
									{filter === 'active' && 'No active todos. Great job!'}
									{filter === 'completed' && 'No completed todos yet.'}
								</div>
							) : (
								filteredTodos.map(todo => (
									<div
										key={todo.id}
										className={`todo-item ${todo.completed ? 'completed' : ''}`}
									>
										{editingId === todo.id ? (
											<div className="edit-mode">
												<input
													type="text"
													className="form-control edit-input"
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													onKeyPress={(e) => handleEditKeyPress(e, todo.id)}
													onBlur={() => saveEdit(todo.id)}
													autoFocus
												/>
												<div className="edit-buttons">
													<button
														className="btn btn-sm btn-success"
														onClick={() => saveEdit(todo.id)}
													>
														Save
													</button>
													<button
														className="btn btn-sm btn-secondary"
														onClick={cancelEdit}
													>
														Cancel
													</button>
												</div>
											</div>
										) : (
											<div className="todo-content">
												<input
													type="checkbox"
													className="todo-checkbox"
													checked={todo.completed}
													onChange={() => toggleComplete(todo.id)}
												/>
												<span
													className="todo-text"
													onDoubleClick={() => startEditing(todo.id, todo.text)}
												>
													{todo.text}
												</span>
												<div className="todo-actions">
													<button
														className="btn btn-sm btn-outline-primary"
														onClick={() => startEditing(todo.id, todo.text)}
														title="Edit"
													>
														✏️
													</button>
													<button
														className="btn btn-sm btn-outline-danger"
														onClick={() => deleteTodo(todo.id)}
														title="Delete"
													>
														🗑️
													</button>
												</div>
											</div>
										)}
									</div>
								))
							)}
						</div>

						{/* Clear Completed Button */}
						{completedTodosCount > 0 && (
							<div className="mt-3 text-center">
								<button
									className="btn btn-outline-danger clear-completed-btn"
									onClick={clearCompleted}
								>
									Clear Completed ({completedTodosCount})
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoApp;
