import React, { useState, useEffect } from 'react';

const Todo = () => {
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
			completed: false
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

	const removeTodo = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<h1 className='col-sm-12 col-md-6'>Todo List</h1>
			</div>
			<div className='row mb-4'>
				<div className='col-sm-12 col-md-8 d-flex'>
					<input
						type='text'
						className='form-control'
						placeholder='Add a new todo...'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
						style={{ marginRight: '10px' }}
					/>
					<button
						className='btn btn-primary'
						onClick={addTodo}
					>
						Add Todo
					</button>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm-12 col-md-8'>
					{todos.length === 0 ? (
						<p className='text-muted'>No todos yet. Add one above!</p>
					) : (
						<ul className='list-group'>
							{todos.map((todo) => (
								<li
									key={todo.id}
									className='list-group-item d-flex justify-content-between align-items-center'
									style={{
										backgroundColor: '#2d2d2d',
										color: '#ffffff',
										borderColor: '#444',
										textDecoration: todo.completed ? 'line-through' : 'none',
										opacity: todo.completed ? 0.6 : 1
									}}
								>
									<div className='d-flex align-items-center'>
										<input
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											style={{ marginRight: '15px', cursor: 'pointer' }}
										/>
										<span>{todo.text}</span>
									</div>
									<button
										className='btn btn-danger btn-sm'
										onClick={() => removeTodo(todo.id)}
									>
										Remove
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Todo;
