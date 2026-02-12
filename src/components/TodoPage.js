import React, { useState, useEffect } from 'react';
import './TodoPage.css';

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
		if (inputValue.trim() === '') {
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: inputValue.trim(),
			completed: false,
		};

		const newTodoList = [...todos, newTodo];
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
		setInputValue('');
	};

	const removeTodo = (id) => {
		const newTodoList = todos.filter((todo) => todo.id !== id);
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
	};

	const toggleComplete = (id) => {
		const newTodoList = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<h1 className='todo-heading'>Todo List</h1>
			</div>
			<div className='row mb-4'>
				<div className='col-md-8 offset-md-2'>
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
							<button
								className='btn btn-primary todo-add-btn'
								onClick={addTodo}
							>
								Add Todo
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{todos.length === 0 ? (
						<div className='empty-state'>
							<p>No todos yet. Add one to get started!</p>
						</div>
					) : (
						<ul className='todo-list'>
							{todos.map((todo) => (
								<li
									key={todo.id}
									className={`todo-item ${todo.completed ? 'completed' : ''}`}
								>
									<input
										type='checkbox'
										className='todo-checkbox'
										checked={todo.completed}
										onChange={() => toggleComplete(todo.id)}
									/>
									<span className='todo-text'>{todo.text}</span>
									<button
										className='btn btn-danger btn-sm todo-remove-btn'
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

export default TodoPage;
