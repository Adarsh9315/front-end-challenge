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

	const handleKeyPress = (e) => {
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

	const pendingCount = todos.filter((t) => !t.completed).length;

	return (
		<div className='container todo-page'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Todo List</h1>
					{todos.length > 0 && (
						<span className='todo-count'>
							{pendingCount} item{pendingCount !== 1 ? 's' : ''} remaining
						</span>
					)}
				</div>
			</div>

			<div className='row mb-4'>
				<div className='col-12 col-md-8 col-lg-6'>
					<div className='input-group'>
						<input
							type='text'
							className='form-control todo-input'
							placeholder='What needs to be done?'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<div className='input-group-append'>
							<button
								className='btn todo-add-btn'
								onClick={addTodo}
								disabled={!inputValue.trim()}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='row'>
				<div className='col-12 col-md-8 col-lg-6'>
					{todos.length === 0 ? (
						<p className='todo-empty'>No todos yet. Add one above!</p>
					) : (
						<ul className='list-group todo-list'>
							{todos.map((todo) => (
								<li
									key={todo.id}
									className={`list-group-item todo-item ${
										todo.completed ? 'todo-completed' : ''
									}`}
								>
									<div
										className='todo-text-wrapper'
										onClick={() => toggleTodo(todo.id)}
									>
										<span className='todo-checkbox'>
											{todo.completed ? '✓' : '○'}
										</span>
										<span className='todo-text'>{todo.text}</span>
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
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
