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
		const text = inputValue.trim();
		if (!text) return;

		const newTodo = {
			id: Date.now(),
			text: text,
			completed: false,
		};

		const updatedTodos = [...todos, newTodo];
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
		setInputValue('');
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
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

	const remaining = todos.filter((t) => !t.completed).length;

	return (
		<div className='container todo-page'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Todo List</h1>
				</div>
			</div>

			<div className='row mb-4'>
				<div className='col-12 col-md-8'>
					<div className='input-group'>
						<input
							type='text'
							className='form-control todo-input'
							placeholder='What needs to be done?'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<div className='input-group-append'>
							<button
								className='btn btn-primary todo-add-btn'
								onClick={addTodo}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>

			{todos.length > 0 && (
				<div className='row mb-3'>
					<div className='col'>
						<span className='todo-count'>
							{remaining} item{remaining !== 1 ? 's' : ''} remaining
						</span>
					</div>
				</div>
			)}

			<div className='row'>
				<div className='col-12 col-md-8'>
					<ul className='list-group todo-list'>
						{todos.map((todo) => (
							<li
								key={todo.id}
								className={
									'list-group-item todo-item d-flex justify-content-between align-items-center' +
									(todo.completed ? ' todo-completed' : '')
								}
							>
								<div
									className='todo-text-container d-flex align-items-center'
									onClick={() => toggleTodo(todo.id)}
									style={{ cursor: 'pointer', flex: 1 }}
								>
									<span
										className='todo-checkbox mr-3'
									>
										{todo.completed ? '✓' : '○'}
									</span>
									<span
										className={
											'todo-text' +
											(todo.completed ? ' todo-text-done' : '')
										}
									>
										{todo.text}
									</span>
								</div>
								<button
									className='btn btn-sm todo-delete-btn'
									onClick={() => deleteTodo(todo.id)}
								>
									✕
								</button>
							</li>
						))}
					</ul>

					{todos.length === 0 && (
						<div className='todo-empty text-center mt-4'>
							<p>No todos yet. Add one above!</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
