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

	const removeTodo = (id) => {
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
		<div className='container todo-page mt-4'>
			<h1 className='mb-4'>Todo List</h1>
			<div className='input-group mb-4'>
				<input
					type='text'
					className='form-control'
					placeholder='Add a new todo...'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				<div className='input-group-append'>
					<button className='btn btn-light' onClick={addTodo}>
						Add
					</button>
				</div>
			</div>
			{todos.length === 0 ? (
				<p className='text-muted'>No todos yet. Add one above!</p>
			) : (
				<ul className='list-group'>
					{todos.map((todo) => (
						<li
							key={todo.id}
							className='list-group-item d-flex justify-content-between align-items-center todo-item'
						>
							<span
								className={todo.completed ? 'todo-completed' : ''}
								onClick={() => toggleTodo(todo.id)}
								style={{ cursor: 'pointer', flex: 1 }}
							>
								{todo.text}
							</span>
							<button
								className='btn btn-sm btn-danger ml-2'
								onClick={() => removeTodo(todo.id)}
							>
								Remove
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TodoPage;
