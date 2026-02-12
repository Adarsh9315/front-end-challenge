import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useSnackbar } from 'react-simple-snackbar';

const TodoApp = () => {
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
	const [openSnackbar] = useSnackbar();

	// Load todos from localStorage on mount
	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
		setTodos(savedTodos);
	}, []);

	// Save todos to localStorage whenever todos change
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = (text) => {
		if (text.trim() === '') {
			openSnackbar('Todo cannot be empty');
			return;
		}
		const newTodo = {
			id: Date.now(),
			text: text.trim(),
			completed: false,
			createdAt: new Date().toISOString()
		};
		setTodos([...todos, newTodo]);
		openSnackbar('Todo added successfully');
	};

	const toggleTodo = (id) => {
		setTodos(todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		));
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id));
		openSnackbar('Todo deleted');
	};

	const clearCompleted = () => {
		const completedCount = todos.filter(todo => todo.completed).length;
		setTodos(todos.filter(todo => !todo.completed));
		if (completedCount > 0) {
			openSnackbar(`${completedCount} completed todo(s) cleared`);
		}
	};

	const getFilteredTodos = () => {
		switch (filter) {
			case 'active':
				return todos.filter(todo => !todo.completed);
			case 'completed':
				return todos.filter(todo => todo.completed);
			default:
				return todos;
		}
	};

	const activeTodosCount = todos.filter(todo => !todo.completed).length;
	const completedTodosCount = todos.filter(todo => todo.completed).length;

	return (
		<div className="todo-app">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<div className="todo-app__card">
							<div className="todo-app__header">
								<h2 className="todo-app__title">Todo App</h2>
								<p className="todo-app__subtitle">Stay organized and get things done</p>
							</div>

							<TodoForm onAdd={addTodo} />

							<div className="todo-app__stats mb-3">
								<span className="badge badge-primary mr-2">
									{activeTodosCount} {activeTodosCount === 1 ? 'task' : 'tasks'} remaining
								</span>
								{completedTodosCount > 0 && (
									<span className="badge badge-success">
										{completedTodosCount} completed
									</span>
								)}
							</div>

							<div className="todo-app__filters mb-3">
								<button
									className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
									onClick={() => setFilter('all')}
								>
									All ({todos.length})
								</button>
								<button
									className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'} ml-2`}
									onClick={() => setFilter('active')}
								>
									Active ({activeTodosCount})
								</button>
								<button
									className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'} ml-2`}
									onClick={() => setFilter('completed')}
								>
									Completed ({completedTodosCount})
								</button>
							</div>

							<TodoList
								todos={getFilteredTodos()}
								onToggle={toggleTodo}
								onDelete={deleteTodo}
							/>

							{completedTodosCount > 0 && (
								<div className="todo-app__actions mt-3">
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={clearCompleted}
									>
										Clear Completed
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoApp;
