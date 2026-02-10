import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [openSnackbar] = useSnackbar();

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
		if (!text.trim()) {
			openSnackbar('Todo text cannot be empty');
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: text.trim(),
			completed: false,
			createdAt: new Date().toISOString()
		};

		const newTodoList = [...todos, newTodo];
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
		openSnackbar('Todo added successfully');
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
		openSnackbar('Todo deleted');
	};

	const clearCompleted = () => {
		const updatedTodos = todos.filter(todo => !todo.completed);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
		openSnackbar('Completed todos cleared');
	};

	const activeTodos = todos.filter(todo => !todo.completed).length;
	const completedTodos = todos.filter(todo => todo.completed).length;

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex justify-content-center mt-5'>
				<div className='col-md-8 col-lg-6'>
					<div className='todo-header'>
						<h1 className='todo-title'>My Todo List</h1>
						<div className='todo-stats'>
							<span className='stat-item'>Active: {activeTodos}</span>
							<span className='stat-item'>Completed: {completedTodos}</span>
							<span className='stat-item'>Total: {todos.length}</span>
						</div>
					</div>

					<AddTodo onAddTodo={addTodo} />

					<TodoList
						todos={todos}
						onToggleTodo={toggleTodo}
						onDeleteTodo={deleteTodo}
					/>

					{completedTodos > 0 && (
						<div className='todo-actions'>
							<button
								className='btn btn-clear'
								onClick={clearCompleted}
							>
								Clear Completed
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
