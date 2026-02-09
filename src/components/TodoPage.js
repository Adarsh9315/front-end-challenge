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
			text: inputValue.trim(),
			completed: false,
		};

		const updatedTodos = [...todos, newTodo];
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
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
		<div className='container todo-page'>
			<h1 className='mt-4 mb-4'>Todo List</h1>
			<form onSubmit={addTodo} className='todo-form mb-4'>
				<div className='input-group'>
					<input
						type='text'
						className='form-control'
						placeholder='Add a new todo...'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<div className='input-group-append'>
						<button className='btn btn-primary' type='submit'>
							Add
						</button>
					</div>
				</div>
			</form>
			{todos.length === 0 ? (
				<p className='text-muted text-center mt-5'>No todos yet. Add one above!</p>
			) : (
				<ul className='list-group todo-list'>
					{todos.map((todo) => (
						<li
							key={todo.id}
							className={`list-group-item todo-item d-flex justify-content-between align-items-center ${
								todo.completed ? 'todo-completed' : ''
							}`}
						>
							<span
								className='todo-text'
								onClick={() => toggleTodo(todo.id)}
								style={{
									textDecoration: todo.completed ? 'line-through' : 'none',
									opacity: todo.completed ? 0.6 : 1,
									cursor: 'pointer',
									flex: 1,
								}}
							>
								{todo.text}
							</span>
							<button
								className='btn btn-sm btn-danger ml-2'
								onClick={() => deleteTodo(todo.id)}
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
			<div className='mt-3 text-muted'>
				{todos.length > 0 && (
					<small>
						{todos.filter((t) => t.completed).length} of {todos.length} completed
					</small>
				)}
			</div>
		</div>
	);
};

export default TodoPage;
