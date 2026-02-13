import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import './TodoPage.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
	const [openSnackbar] = useSnackbar();

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

	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = () => {
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

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'active') return !todo.completed;
		if (filter === 'completed') return todo.completed;
		return true;
	});

	const activeTodosCount = todos.filter((todo) => !todo.completed).length;
	const completedTodosCount = todos.filter((todo) => todo.completed).length;

	return (
		<div className='todo-page'>
			<div className='todo-container'>
				<header className='todo-header'>
					<h1>Todo List</h1>
					<p className='todo-subtitle'>Organize your tasks and stay productive</p>
				</header>

				<div className='todo-input-section'>
					<div className='todo-input-wrapper'>
						<input
							type='text'
							className='todo-input'
							placeholder='What needs to be done?'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<button className='btn btn-primary' onClick={addTodo}>
							Add Todo
						</button>
					</div>
				</div>

				{todos.length > 0 && (
					<div className='todo-filters'>
						<button
							className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
							onClick={() => setFilter('all')}
						>
							All ({todos.length})
						</button>
						<button
							className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
							onClick={() => setFilter('active')}
						>
							Active ({activeTodosCount})
						</button>
						<button
							className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
							onClick={() => setFilter('completed')}
						>
							Completed ({completedTodosCount})
						</button>
						{completedTodosCount > 0 && (
							<button className='btn-clear' onClick={clearCompleted}>
								Clear Completed
							</button>
						)}
					</div>
				)}

				<div className='todo-list'>
					{filteredTodos.length === 0 ? (
						<div className='todo-empty'>
							<p>
								{filter === 'all'
									? "No todos yet. Add one above to get started!"
									: filter === 'active'
									? 'No active todos. Great job!'
									: 'No completed todos yet.'}
							</p>
						</div>
					) : (
						filteredTodos.map((todo) => (
							<div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
								<input
									type='checkbox'
									className='todo-checkbox'
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
								/>
								<span className='todo-text'>{todo.text}</span>
								<button
									className='todo-delete'
									onClick={() => deleteTodo(todo.id)}
									aria-label='Delete todo'
								>
									×
								</button>
							</div>
						))
					)}
				</div>

				{todos.length > 0 && (
					<div className='todo-stats'>
						<p>
							{activeTodosCount} {activeTodosCount === 1 ? 'task' : 'tasks'} remaining
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TodoPage;
