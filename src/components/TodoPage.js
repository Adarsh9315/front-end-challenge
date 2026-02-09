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

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1 className='text-white'>Todo List</h1>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-8 offset-md-2'>
					<div className='input-group'>
						<input
							type='text'
							className='form-control'
							placeholder='Add a new todo...'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<div className='input-group-append'>
							<button
								className='btn btn-primary'
								type='button'
								onClick={addTodo}
							>
								Add Todo
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{todos.length === 0 ? (
						<div className='text-center text-white mt-5'>
							<p>No todos yet. Add one above!</p>
						</div>
					) : (
						<ul className='list-group'>
							{todos.map((todo) => (
								<li
									key={todo.id}
									className={`list-group-item d-flex justify-content-between align-items-center ${
										todo.completed ? 'bg-dark text-muted' : 'bg-secondary text-white'
									}`}
									style={{
										marginBottom: '10px',
										borderRadius: '5px',
										textDecoration: todo.completed ? 'line-through' : 'none'
									}}
								>
									<div className='form-check'>
										<input
											className='form-check-input'
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											style={{ cursor: 'pointer' }}
										/>
										<label
											className='form-check-label'
											style={{
												cursor: 'pointer',
												marginLeft: '10px',
												textDecoration: todo.completed ? 'line-through' : 'none'
											}}
											onClick={() => toggleTodo(todo.id)}
										>
											{todo.text}
										</label>
									</div>
									<button
										className='btn btn-danger btn-sm'
										onClick={() => deleteTodo(todo.id)}
									>
										Delete
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
			{todos.length > 0 && (
				<div className='row mt-4'>
					<div className='col-md-8 offset-md-2 text-center text-white'>
						<p>
							Total: {todos.length} | Completed: {todos.filter(t => t.completed).length} | 
							Pending: {todos.filter(t => !t.completed).length}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default TodoPage;
