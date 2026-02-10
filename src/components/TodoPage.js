import React, { useState, useEffect } from 'react';

const TodoPage = () => {
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

	const addTodo = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') return;

		const newTodo = {
			id: Date.now(),
			text: inputValue,
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

	const deleteTodo = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex justify-content-center mt-5'>
				<div className='col-md-6'>
					<h1 className='text-center mb-4'>Todo List</h1>
					<form onSubmit={addTodo} className='mb-4'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control todo-input'
								placeholder='Add a new todo...'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<button className='btn btn-primary' type='submit'>
								Add
							</button>
						</div>
					</form>
					<ul className='todo-list'>
						{todos.map((todo) => (
							<li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
								<div className='todo-content'>
									<input
										type='checkbox'
										checked={todo.completed}
										onChange={() => toggleTodo(todo.id)}
										className='todo-checkbox'
									/>
									<span className='todo-text'>{todo.text}</span>
								</div>
								<button
									onClick={() => deleteTodo(todo.id)}
									className='btn btn-danger btn-sm'
								>
									Delete
								</button>
							</li>
						))}
					</ul>
					{todos.length === 0 && (
						<p className='text-center text-muted'>No todos yet. Add one above!</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
