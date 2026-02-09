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

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	return (
		<div className='container todo-page'>
			<h1 className='todo-title'>Todo List</h1>
			<div className='todo-input-container'>
				<input
					className='form-control todo-input'
					type='text'
					placeholder='Add a new todo...'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				<button className='btn todo-add-btn' onClick={addTodo}>
					Add
				</button>
			</div>
			{todos.length === 0 ? (
				<p className='todo-empty'>No todos yet. Add one above!</p>
			) : (
				<ul className='todo-list'>
					{todos.map((todo) => (
						<li
							key={todo.id}
							className={`todo-item ${todo.completed ? 'todo-completed' : ''}`}
						>
							<span
								className='todo-text'
								onClick={() => toggleTodo(todo.id)}
							>
								{todo.text}
							</span>
							<button
								className='btn todo-delete-btn'
								onClick={() => deleteTodo(todo.id)}
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TodoPage;
