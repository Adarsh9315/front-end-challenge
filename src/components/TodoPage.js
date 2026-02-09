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
			text: inputValue,
			completed: false,
			createdAt: new Date().toISOString()
		};

		const newTodoList = [...todos, newTodo];
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
		setInputValue('');
	};

	const toggleTodo = (id) => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter(todo => todo.id !== id);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const clearCompleted = () => {
		const updatedTodos = todos.filter(todo => !todo.completed);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const activeTodos = todos.filter(todo => !todo.completed).length;

	return (
		<div className='todo-page'>
			<div className='todo-container'>
				<h1 className='todo-title'>My Todo List</h1>

				<form onSubmit={addTodo} className='todo-form'>
					<input
						type='text'
						className='todo-input'
						placeholder='What needs to be done?'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type='submit' className='todo-add-btn'>Add</button>
				</form>

				<div className='todo-stats'>
					<span>{activeTodos} {activeTodos === 1 ? 'item' : 'items'} left</span>
					{todos.some(todo => todo.completed) && (
						<button onClick={clearCompleted} className='clear-completed-btn'>
							Clear Completed
						</button>
					)}
				</div>

				<div className='todo-list'>
					{todos.length === 0 ? (
						<p className='todo-empty'>No todos yet. Add one above!</p>
					) : (
						todos.map(todo => (
							<div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
								<div className='todo-item-content'>
									<input
										type='checkbox'
										checked={todo.completed}
										onChange={() => toggleTodo(todo.id)}
										className='todo-checkbox'
									/>
									<span className='todo-text'>{todo.text}</span>
								</div>
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
	);
};

export default TodoPage;
