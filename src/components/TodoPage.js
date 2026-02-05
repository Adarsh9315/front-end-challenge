import React, { useState, useEffect } from 'react';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	// Load todos from localStorage on mount
	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		setTodos(savedTodos);
	}, []);

	// Save todos to localStorage whenever they change
	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	// Add a new todo
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

	// Delete a todo
	const deleteTodo = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	// Toggle todo completion
	const toggleComplete = (id) => {
		const newTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	return (
		<div className='todo-page'>
			<div className='todo-container'>
				<h1 className='todo-heading'>My Todo List</h1>
				
				<form onSubmit={addTodo} className='todo-form'>
					<input
						type='text'
						className='todo-input'
						placeholder='Add a new task...'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type='submit' className='todo-add-btn'>
						Add
					</button>
				</form>

				<div className='todo-stats'>
					<span>Total: {todos.length}</span>
					<span>Completed: {todos.filter(t => t.completed).length}</span>
					<span>Pending: {todos.filter(t => !t.completed).length}</span>
				</div>

				<div className='todo-list'>
					{todos.length === 0 ? (
						<p className='empty-message'>No todos yet. Add one to get started!</p>
					) : (
						todos.map(todo => (
							<div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
								<div className='todo-item-content' onClick={() => toggleComplete(todo.id)}>
									<div className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}>
										{todo.completed && '✓'}
									</div>
									<span className='todo-text'>{todo.text}</span>
								</div>
								<button 
									className='todo-delete-btn'
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
	);
};

export default TodoPage;
