import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import MovieListHeading from './MovieListHeading';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		try {
			const savedTodos = JSON.parse(localStorage.getItem('todos'));
			if (savedTodos) {
				setTodos(savedTodos);
			}
		} catch (error) {
			console.error('Error loading todos from localStorage:', error);
		}
	}, []);

	const saveToLocalStorage = useCallback((items) => {
		try {
			localStorage.setItem('todos', JSON.stringify(items));
		} catch (error) {
			console.error('Error saving todos to localStorage:', error);
		}
	}, []);

	const addTodo = useCallback((text) => {
		const newTodo = {
			id: Date.now(),
			text: text,
			completed: false
		};
		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	}, [todos, saveToLocalStorage]);

	const toggleTodo = useCallback((id) => {
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	}, [todos, saveToLocalStorage]);

	const deleteTodo = useCallback((id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	}, [todos, saveToLocalStorage]);

	const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);
	const totalCount = todos.length;

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
					<TodoList
						todos={todos}
						onToggle={toggleTodo}
						onDelete={deleteTodo}
					/>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
