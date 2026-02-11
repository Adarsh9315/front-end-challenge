import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [openSnackbar] = useSnackbar();

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
		if (inputValue.trim() === '') {
			openSnackbar('Please enter a todo');
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
		};

		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		setInputValue('');
		openSnackbar('Todo added successfully');
	};

	const toggleTodo = (id) => {
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		openSnackbar('Todo deleted');
	};

	const clearCompleted = () => {
		const newTodos = todos.filter((todo) => !todo.completed);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		openSnackbar('Completed todos cleared');
	};

	const completedCount = todos.filter((todo) => todo.completed).length;
	const activeCount = todos.length - completedCount;

	const todoContainerStyle = {
		maxWidth: '800px',
		margin: '0 auto',
		padding: '40px 20px',
	};

	const todoHeaderStyle = {
		textAlign: 'center',
		marginBottom: '40px',
		color: '#ffffff',
		fontSize: '2.5rem',
		fontWeight: '600',
	};

	const formStyle = {
		display: 'flex',
		gap: '12px',
		marginBottom: '30px',
	};

	const inputStyle = {
		flex: 1,
		padding: '12px 16px',
		fontSize: '1rem',
		background: '#1a1a1a',
		border: '1px solid #333',
		borderRadius: '4px',
		color: '#ffffff',
		outline: 'none',
	};

	const buttonStyle = {
		padding: '12px 24px',
		fontSize: '1rem',
		background: '#333',
		border: '1px solid #444',
		borderRadius: '4px',
		color: '#ffffff',
		cursor: 'pointer',
		transition: 'all 0.2s',
		fontWeight: '500',
	};

	const todoListStyle = {
		listStyle: 'none',
		padding: 0,
		margin: 0,
	};

	const todoItemStyle = (completed) => ({
		display: 'flex',
		alignItems: 'center',
		gap: '12px',
		padding: '16px',
		marginBottom: '12px',
		background: '#1a1a1a',
		border: '1px solid #333',
		borderRadius: '4px',
		transition: 'all 0.2s',
	});

	const checkboxStyle = {
		width: '20px',
		height: '20px',
		cursor: 'pointer',
		accentColor: '#666',
	};

	const todoTextStyle = (completed) => ({
		flex: 1,
		fontSize: '1rem',
		color: completed ? '#666' : '#ffffff',
		textDecoration: completed ? 'line-through' : 'none',
	});

	const deleteButtonStyle = {
		padding: '6px 12px',
		fontSize: '0.875rem',
		background: '#2a2a2a',
		border: '1px solid #444',
		borderRadius: '4px',
		color: '#888',
		cursor: 'pointer',
		transition: 'all 0.2s',
	};

	const statsStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: '30px',
		padding: '16px',
		background: '#1a1a1a',
		border: '1px solid #333',
		borderRadius: '4px',
		color: '#888',
		fontSize: '0.875rem',
	};

	const emptyStateStyle = {
		textAlign: 'center',
		padding: '60px 20px',
		color: '#666',
		fontSize: '1.1rem',
	};

	return (
		<div style={todoContainerStyle}>
			<h1 style={todoHeaderStyle}>Todo List</h1>

			<form onSubmit={addTodo} style={formStyle}>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="What needs to be done?"
					style={inputStyle}
				/>
				<button
					type="submit"
					style={buttonStyle}
					onMouseEnter={(e) => (e.target.style.background = '#444')}
					onMouseLeave={(e) => (e.target.style.background = '#333')}
				>
					Add Todo
				</button>
			</form>

			{todos.length === 0 ? (
				<div style={emptyStateStyle}>
					No todos yet. Add one above to get started!
				</div>
			) : (
				<>
					<ul style={todoListStyle}>
						{todos.map((todo) => (
							<li key={todo.id} style={todoItemStyle(todo.completed)}>
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
									style={checkboxStyle}
								/>
								<span style={todoTextStyle(todo.completed)}>{todo.text}</span>
								<button
									onClick={() => deleteTodo(todo.id)}
									style={deleteButtonStyle}
									onMouseEnter={(e) => {
										e.target.style.background = '#333';
										e.target.style.color = '#ff6b6b';
									}}
									onMouseLeave={(e) => {
										e.target.style.background = '#2a2a2a';
										e.target.style.color = '#888';
									}}
								>
									Delete
								</button>
							</li>
						))}
					</ul>

					<div style={statsStyle}>
						<span>
							{activeCount} {activeCount === 1 ? 'item' : 'items'} left
						</span>
						{completedCount > 0 && (
							<button
								onClick={clearCompleted}
								style={{
									...deleteButtonStyle,
									padding: '8px 16px',
								}}
								onMouseEnter={(e) => {
									e.target.style.background = '#333';
									e.target.style.color = '#ff6b6b';
								}}
								onMouseLeave={(e) => {
									e.target.style.background = '#2a2a2a';
									e.target.style.color = '#888';
								}}
							>
								Clear completed ({completedCount})
							</button>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default TodoPage;
