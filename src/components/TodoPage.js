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

	// Toggle todo completion
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

	// Edit a todo
	const editTodo = (id, newText) => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? { ...todo, text: newText } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	// Clear completed todos
	const clearCompleted = () => {
		const updatedTodos = todos.filter(todo => !todo.completed);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	// Filter todos based on current filter
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
		<div className="todo-page">
			<div className="todo-container">
				<h1 className="todo-title">Todo List</h1>
				
				<form onSubmit={addTodo} className="todo-input-form">
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
						Completed ({todos.length - activeTodosCount})
					</button>
				</div>

				<div className="todo-list">
					{filteredTodos.length === 0 ? (
						<p className="empty-message">
							{filter === 'all' ? 'No todos yet. Add one above!' : 
							 filter === 'active' ? 'No active todos!' : 
							 'No completed todos!'}
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

				{todos.length > 0 && (
					<div className="todo-footer">
						<span className="todo-count">
							{activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
						</span>
						{todos.length > activeTodosCount && (
							<button className="clear-completed-btn" onClick={clearCompleted}>
								Clear Completed
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);

	const handleEdit = () => {
		if (editText.trim() === '') return;
		onEdit(todo.id, editText);
		setIsEditing(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleEdit();
		} else if (e.key === 'Escape') {
			setEditText(todo.text);
			setIsEditing(false);
		}
	};

	return (
		<div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
			<input
				type="checkbox"
				className="todo-checkbox"
				checked={todo.completed}
				onChange={() => onToggle(todo.id)}
			/>
			
			{isEditing ? (
				<input
					type="text"
					className="todo-edit-input"
					value={editText}
					onChange={(e) => setEditText(e.target.value)}
					onBlur={handleEdit}
					onKeyDown={handleKeyDown}
					autoFocus
				/>
			) : (
				<span
					className="todo-text"
					onDoubleClick={() => setIsEditing(true)}
				>
					{todo.text}
				</span>
			)}

			<div className="todo-actions">
				{!isEditing && (
					<>
						<button
							className="todo-edit-btn"
							onClick={() => setIsEditing(true)}
							title="Edit"
						>
							✎
						</button>
						<button
							className="todo-delete-btn"
							onClick={() => onDelete(todo.id)}
							title="Delete"
						>
							×
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default TodoPage;
