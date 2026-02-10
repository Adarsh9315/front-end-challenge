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

	const addTodo = () => {
		if (inputValue.trim() === '') {
			openSnackbar('Please enter a todo item');
			return;
		}

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

	const removeTodo = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const toggleComplete = (id) => {
		const newTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
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
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h2 className='text-white'>Todo List</h2>
					{totalCount > 0 && (
						<p className='text-muted'>
							{completedCount} of {totalCount} completed
						</p>
					)}
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-8 col-lg-6'>
					<div className='input-group'>
						<input
							type='text'
							className='form-control'
							placeholder='Add a new todo...'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
							style={{
								backgroundColor: '#2a2a2a',
								color: '#fff',
								border: '1px solid #444',
								padding: '12px 16px'
							}}
						/>
						<div className='input-group-append'>
							<button
								className='btn btn-primary'
								onClick={addTodo}
								style={{
									padding: '12px 24px',
									backgroundColor: '#007bff',
									border: 'none'
								}}
							>
								Add Todo
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-8 col-lg-6'>
					{todos.length === 0 ? (
						<div className='text-center text-muted mt-5'>
							<p>No todos yet. Add one above to get started!</p>
						</div>
					) : (
						<div className='todo-list'>
							{todos.map((todo) => (
								<div
									key={todo.id}
									className='todo-item'
									style={{
										backgroundColor: '#1a1a1a',
										border: '1px solid #333',
										borderRadius: '8px',
										padding: '16px',
										marginBottom: '12px',
										display: 'flex',
										alignItems: 'center',
										gap: '12px',
										transition: 'all 0.2s',
										opacity: todo.completed ? 0.6 : 1
									}}
								>
									<input
										type='checkbox'
										checked={todo.completed}
										onChange={() => toggleComplete(todo.id)}
										style={{
											width: '20px',
											height: '20px',
											cursor: 'pointer'
										}}
									/>
									<span
										style={{
											flex: 1,
											textDecoration: todo.completed ? 'line-through' : 'none',
											color: todo.completed ? '#888' : '#fff',
											fontSize: '1rem'
										}}
									>
										{todo.text}
									</span>
									<button
										onClick={() => removeTodo(todo.id)}
										className='btn btn-sm'
										style={{
											backgroundColor: '#dc3545',
											color: '#fff',
											border: 'none',
											padding: '6px 12px',
											borderRadius: '4px',
											cursor: 'pointer'
										}}
									>
										Remove
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
