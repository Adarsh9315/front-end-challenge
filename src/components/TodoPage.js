import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import MovieListHeading from './MovieListHeading';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = (text) => {
		const newTodo = {
			id: Date.now(),
			text: text,
			completed: false
		};
		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
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
	};

	const updateTodo = (id, newText) => {
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, text: newText } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const clearCompleted = () => {
		const newTodos = todos.filter((todo) => !todo.completed);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
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

	const completedCount = todos.filter((todo) => todo.completed).length;
	const totalCount = todos.length;
	const activeCount = totalCount - completedCount;
	const filteredTodos = getFilteredTodos();

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='My Todos' />
			</div>
			{totalCount > 0 && (
				<div className='todo-stats mb-4'>
					<p style={{ fontSize: '1.1em', opacity: 0.8 }}>
						{completedCount} of {totalCount} completed
					</p>
				</div>
			)}
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					<AddTodo onAdd={addTodo} />
					{totalCount > 0 && (
						<div className='todo-filters mb-3'>
							<button
								className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
								onClick={() => setFilter('all')}
							>
								All ({totalCount})
							</button>
							<button
								className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
								onClick={() => setFilter('active')}
							>
								Active ({activeCount})
							</button>
							<button
								className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
								onClick={() => setFilter('completed')}
							>
								Completed ({completedCount})
							</button>
							{completedCount > 0 && (
								<button
									className='filter-btn clear-completed'
									onClick={clearCompleted}
								>
									Clear Completed
								</button>
							)}
						</div>
					)}
					<TodoList
						todos={filteredTodos}
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						onUpdate={updateTodo}
					/>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
