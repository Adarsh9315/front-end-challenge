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
		const updatedTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const deleteTodo = (id) => {
		const filteredTodos = todos.filter(todo => todo.id !== id);
		setTodos(filteredTodos);
		saveToLocalStorage(filteredTodos);
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Todo List</h1>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6'>
					<form onSubmit={addTodo}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Add a new todo...'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
						</div>
						<button type='submit' className='btn btn-primary mt-2'>
							Add Todo
						</button>
					</form>
				</div>
			</div>
			<div className='row mt-4'>
				<div className='col-md-8'>
					{todos.length === 0 ? (
						<p>No todos yet. Add one above!</p>
					) : (
						<ul className='list-group'>
							{todos.map((todo) => (
								<li
									key={todo.id}
									className='list-group-item d-flex justify-content-between align-items-center'
									style={{
										backgroundColor: '#2a2a2a',
										border: '1px solid #444',
										marginBottom: '10px'
									}}
								>
									<div className='d-flex align-items-center'>
										<input
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											className='mr-3'
										/>
										<span
											style={{
												textDecoration: todo.completed ? 'line-through' : 'none',
												color: todo.completed ? '#888' : '#fff'
											}}
										>
											{todo.text}
										</span>
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
