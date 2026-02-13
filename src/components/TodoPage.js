import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import './TodoPage.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all'); // all, active, completed
	const [openSnackbar] = useSnackbar();

	// Load todos from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem('todos');
			if (!stored) return;
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				setTodos(parsed);
			}
		} catch (error) {
			console.error('Failed to parse todos from storage', error);
		}
	}, []);

	// Save todos to localStorage whenever they change
	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = (e) => {
		e.preventDefault();
		const trimmedValue = inputValue.trim();
		
		if (!trimmedValue) {
			openSnackbar('Please enter a todo item');
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: trimmedValue,
			completed: false,
			createdAt: new Date().toISOString()
		};

		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		setInputValue('');
		openSnackbar('Todo added successfully');
	};

	const toggleTodo = (id) => {
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		openSnackbar('Todo deleted');
	};

	const clearCompleted = () => {
		const newTodos = todos.filter((todo) => !todo.completed);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		openSnackbar('Completed todos cleared');
	};

	const getFilteredTodos = () => {
		switch (filter) {
			case 'active':
				return todos.filter((todo) => !todo.completed);
			case 'completed':
				return todos.filter((todo) => todo.completed);
			default:
				return todos;
		}
	};

	const filteredTodos = getFilteredTodos();
	const activeCount = todos.filter((todo) => !todo.completed).length;
	const completedCount = todos.filter((todo) => todo.completed).length;

	return (
		<div className='todo-page'>
			<header className='todo-hero'>
				<div className='todo-hero__overlay' />
				<div className='todo-hero__content'>
					<p className='todo-hero__eyebrow'>Task Management</p>
					<h1>Organize Your Day</h1>
					<p>
						Keep track of your tasks and stay productive. Add, complete, and manage your
						daily todos with ease.
					</p>
				</div>
			</header>

			<section className='todo-container'>
				<div className='todo-stats'>
					<div className='stat-card'>
						<span className='stat-number'>{todos.length}</span>
						<span className='stat-label'>Total</span>
					</div>
					<div className='stat-card'>
						<span className='stat-number'>{activeCount}</span>
						<span className='stat-label'>Active</span>
					</div>
					<div className='stat-card'>
						<span className='stat-number'>{completedCount}</span>
						<span className='stat-label'>Completed</span>
					</div>
				</div>

				<form onSubmit={addTodo} className='todo-form'>
					<input
						type='text'
						className='todo-input'
						placeholder='What needs to be done?'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type='submit' className='btn btn-primary'>
						Add Todo
					</button>
				</form>

				<div className='todo-filters'>
					<button
						className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
						onClick={() => setFilter('all')}
					>
						All
					</button>
					<button
						className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
						onClick={() => setFilter('active')}
					>
						Active
					</button>
					<button
						className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
						onClick={() => setFilter('completed')}
					>
						Completed
					</button>
					{completedCount > 0 && (
						<button className='filter-btn clear-btn' onClick={clearCompleted}>
							Clear Completed
						</button>
					)}
				</div>

				<div className='todo-list'>
					{filteredTodos.length === 0 ? (
						<div className='empty-state'>
							<p>
								{filter === 'completed'
									? 'No completed todos yet'
									: filter === 'active'
									? 'No active todos'
									: 'No todos yet. Add one to get started!'}
							</p>
						</div>
					) : (
						filteredTodos.map((todo) => (
							<div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
								<div className='todo-item__content'>
									<input
										type='checkbox'
										className='todo-checkbox'
										checked={todo.completed}
										onChange={() => toggleTodo(todo.id)}
										id={`todo-${todo.id}`}
									/>
									<label htmlFor={`todo-${todo.id}`} className='todo-text'>
										{todo.text}
									</label>
								</div>
								<button
									className='delete-btn'
									onClick={() => deleteTodo(todo.id)}
									aria-label='Delete todo'
								>
									×
								</button>
							</div>
						))
					)}
				</div>
			</section>
		</div>
	);
};

export default TodoPage;
