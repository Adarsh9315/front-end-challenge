import React, { useState, useEffect } from 'react';
import '../App.css';
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

	const addTodo = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') return;

		const newTodo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
		};

		const newTodoList = [...todos, newTodo];
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
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
			<div className='row justify-content-center mt-5'>
				<div className='col-md-6'>
					<h1 className='todo-heading'>My Todo List</h1>
					<form onSubmit={addTodo} className='todo-form'>
						<input
							type='text'
							className='todo-input'
							placeholder='Add a new todo...'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<button type='submit' className='todo-add-btn'>
							Add
						</button>
					</form>
					<div className='todo-list'>
						{todos.length === 0 ? (
							<p className='no-todos'>No todos yet. Add one to get started!</p>
						) : (
							todos.map((todo) => (
								<div key={todo.id} className='todo-item'>
									<input
										type='checkbox'
										checked={todo.completed}
										onChange={() => toggleTodo(todo.id)}
										className='todo-checkbox'
									/>
									<span
										className={`todo-text ${todo.completed ? 'completed' : ''}`}
									>
										{todo.text}
									</span>
									<button
										onClick={() => deleteTodo(todo.id)}
										className='todo-delete-btn'
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
