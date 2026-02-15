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

	const addTodo = () => {
		if (inputValue.trim() !== '') {
			const newTodo = {
				id: Date.now(),
				text: inputValue,
				completed: false
			};
			const newTodoList = [...todos, newTodo];
			setTodos(newTodoList);
			saveToLocalStorage(newTodoList);
			setInputValue('');
		}
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
					<h1>My Todo List</h1>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-6'>
					<div className='input-group'>
						<input
							type='text'
							className='form-control todo-input'
							placeholder='Add a new todo...'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<div className='input-group-append'>
							<button className='btn btn-primary' onClick={addTodo}>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-8'>
					{todos.length === 0 ? (
						<p className='text-muted'>No todos yet. Add one above!</p>
					) : (
						<ul className='list-group'>
							{todos.map((todo) => (
								<li
									key={todo.id}
									className='list-group-item d-flex justify-content-between align-items-center todo-item'
								>
									<div className='form-check'>
										<input
											className='form-check-input'
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
										/>
										<label
											className={`form-check-label ${todo.completed ? 'todo-completed' : ''}`}
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
		</div>
	);
};

export default TodoPage;
