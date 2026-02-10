import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { useSnackbar } from 'react-simple-snackbar';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('all');
	const [openSnackbar] = useSnackbar();

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		setTodos(storedTodos);
	}, []);

	const saveTodos = (newTodos) => {
		localStorage.setItem('todos', JSON.stringify(newTodos));
		setTodos(newTodos);
	};

	const addTodo = (text) => {
		const newTodo = {
			id: Date.now().toString(),
			text,
			completed: false,
			createdAt: new Date().toISOString()
		};
		const newTodos = [...todos, newTodo];
		saveTodos(newTodos);
		openSnackbar('Todo added successfully!');
	};

	const toggleTodo = (id) => {
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		saveTodos(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		saveTodos(newTodos);
		openSnackbar('Todo deleted');
	};

	const editTodo = (id, newText) => {
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, text: newText } : todo
		);
		saveTodos(newTodos);
		openSnackbar('Todo updated');
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
	const completedCount = todos.filter((todo) => todo.completed).length;
	const activeCount = todos.length - completedCount;

	return (
		<div className='todo-page'>
			<section className='todo-hero container py-5'>
				<div className='todo-header'>
					<p className='eyebrow mb-2'>Task Management</p>
					<h1 className='display-5 fw-bold'>Organize your day.</h1>
					<p className='lead text-muted'>
						Keep track of your tasks and stay productive with our simple todo manager.
					</p>
				</div>

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
			</section>

			<section className='todo-content container'>
				<AddTodo onAdd={addTodo} />

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
				</div>

				<TodoList
					todos={filteredTodos}
					onToggle={toggleTodo}
					onDelete={deleteTodo}
					onEdit={editTodo}
				/>
			</section>
		</div>
	);
};

export default TodoPage;
