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

	const completedCount = todos.filter((t) => t.completed).length;

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Todos</h1>
				</div>
			</div>

			<div className='todo-input-container mb-4'>
				<div className='d-flex'>
					<input
						className='form-control todo-input'
						type='text'
						placeholder='Add a new todo...'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button className='btn todo-add-btn ml-2' onClick={addTodo}>
						Add
					</button>
				</div>
			</div>

			{todos.length > 0 && (
				<div className='todo-stats mb-3'>
					{completedCount} of {todos.length} completed
				</div>
			)}

			<div className='todo-list'>
				{todos.length === 0 ? (
					<div className='todo-empty'>
						No todos yet. Add one above to get started!
					</div>
				) : (
					todos.map((todo) => (
						<div
							key={todo.id}
							className={`todo-item d-flex align-items-center ${
								todo.completed ? 'todo-completed' : ''
							}`}
						>
							<div
								className='todo-checkbox'
								onClick={() => toggleTodo(todo.id)}
							>
								{todo.completed ? '✓' : ''}
							</div>
							<span
								className='todo-text flex-grow-1'
								onClick={() => toggleTodo(todo.id)}
							>
								{todo.text}
							</span>
							<button
								className='btn todo-delete-btn'
								onClick={() => deleteTodo(todo.id)}
							>
								✕
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default TodoPage;
