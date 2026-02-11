import React, { useState, useEffect } from 'react';
import '../App.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
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

	const todoContainerStyle = {
		maxWidth: '600px',
		margin: '40px auto',
		padding: '20px',
	};

	const headingStyle = {
		textAlign: 'center',
		fontSize: '2.5rem',
		marginBottom: '30px',
		color: '#ffffff',
		fontWeight: '300',
	};

	const formStyle = {
		display: 'flex',
		marginBottom: '20px',
		gap: '10px',
	};

	const inputStyle = {
		flex: '1',
		padding: '12px 16px',
		fontSize: '1rem',
		border: '1px solid #333',
		borderRadius: '4px',
		background: '#1a1a1a',
		color: '#ffffff',
		outline: 'none',
	};

	const buttonStyle = {
		padding: '12px 24px',
		fontSize: '1rem',
		border: 'none',
		borderRadius: '4px',
		background: '#4CAF50',
		color: '#ffffff',
		cursor: 'pointer',
		fontWeight: '500',
		transition: 'background 0.2s',
	};

	const filterContainerStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '20px',
		padding: '10px',
		background: '#1a1a1a',
		borderRadius: '4px',
	};

	const filterButtonsStyle = {
		display: 'flex',
		gap: '10px',
	};

	const filterButtonStyle = (isActive) => ({
		padding: '6px 12px',
		fontSize: '0.9rem',
		border: '1px solid #333',
		borderRadius: '4px',
		background: isActive ? '#333' : 'transparent',
		color: isActive ? '#ffffff' : '#888',
		cursor: 'pointer',
		fontWeight: isActive ? '600' : '400',
		transition: 'all 0.2s',
	});

	const todoListStyle = {
		listStyle: 'none',
		padding: '0',
		margin: '0',
	};

	const todoItemStyle = (completed) => ({
		display: 'flex',
		alignItems: 'center',
		padding: '12px 16px',
		marginBottom: '8px',
		background: '#1a1a1a',
		borderRadius: '4px',
		border: '1px solid #333',
		transition: 'all 0.2s',
	});

	const checkboxStyle = {
		width: '20px',
		height: '20px',
		marginRight: '12px',
		cursor: 'pointer',
	};

	const todoTextStyle = (completed) => ({
		flex: '1',
		fontSize: '1rem',
		color: completed ? '#666' : '#ffffff',
		textDecoration: completed ? 'line-through' : 'none',
	});

	const deleteButtonStyle = {
		padding: '6px 12px',
		fontSize: '0.9rem',
		border: 'none',
		borderRadius: '4px',
		background: '#f44336',
		color: '#ffffff',
		cursor: 'pointer',
		fontWeight: '500',
		transition: 'background 0.2s',
	};

	const clearButtonStyle = {
		padding: '6px 12px',
		fontSize: '0.9rem',
		border: '1px solid #333',
		borderRadius: '4px',
		background: 'transparent',
		color: '#888',
		cursor: 'pointer',
		fontWeight: '400',
		transition: 'all 0.2s',
	};

	const counterStyle = {
		fontSize: '0.9rem',
		color: '#888',
	};

	return (
		<div className='container-fluid' style={todoContainerStyle}>
			<h1 style={headingStyle}>Todo List</h1>

			<form onSubmit={addTodo} style={formStyle}>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="What needs to be done?"
					style={inputStyle}
				/>
				<button type="submit" style={buttonStyle}>Add</button>
			</form>

			{todos.length > 0 && (
				<>
					<div style={filterContainerStyle}>
						<span style={counterStyle}>
							{activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
						</span>
						<div style={filterButtonsStyle}>
							<button
								onClick={() => setFilter('all')}
								style={filterButtonStyle(filter === 'all')}
							>
								All
							</button>
							<button
								onClick={() => setFilter('active')}
								style={filterButtonStyle(filter === 'active')}
							>
								Active
							</button>
							<button
								onClick={() => setFilter('completed')}
								style={filterButtonStyle(filter === 'completed')}
							>
								Completed
							</button>
						</div>
						{todos.some(todo => todo.completed) && (
							<button onClick={clearCompleted} style={clearButtonStyle}>
								Clear Completed
							</button>
						)}
					</div>

					<ul style={todoListStyle}>
						{filteredTodos.map(todo => (
							<li key={todo.id} style={todoItemStyle(todo.completed)}>
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
									style={checkboxStyle}
								/>
								<span style={todoTextStyle(todo.completed)}>
									{todo.text}
								</span>
								<button
									onClick={() => deleteTodo(todo.id)}
									style={deleteButtonStyle}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</>
			)}

			{todos.length === 0 && (
				<div style={{ textAlign: 'center', color: '#666', marginTop: '40px', fontSize: '1.1rem' }}>
					No todos yet. Add one above to get started!
				</div>
			)}
		</div>
	);
};

export default TodoPage;
