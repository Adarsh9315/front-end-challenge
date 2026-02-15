import React, { useState, useEffect } from 'react';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		setTodos(savedTodos);
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
		};

		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		setInputValue('');
	};

	const toggleTodo = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Todo List</h1>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<form onSubmit={addTodo} className='mb-4'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								placeholder='Add a new todo...'
							/>
							<div className='input-group-append'>
								<button className='btn btn-primary' type='submit'>
									Add
								</button>
							</div>
						</div>
					</form>

					<div className='todo-list'>
						{todos.length === 0 ? (
							<p className='text-center text-muted'>No todos yet. Add one above!</p>
						) : (
							todos.map((todo) => (
								<div
									key={todo.id}
									className={`todo-item d-flex align-items-center justify-content-between mb-3 p-3 ${
										todo.completed ? 'completed' : ''
									}`}
								>
									<div className='d-flex align-items-center flex-grow-1'>
										<input
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											className='mr-3'
										/>
										<span
											className={todo.completed ? 'text-strikethrough' : ''}
											onClick={() => toggleTodo(todo.id)}
											style={{ cursor: 'pointer' }}
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
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
