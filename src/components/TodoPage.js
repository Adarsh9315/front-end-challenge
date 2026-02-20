import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import MovieListHeading from './components/MovieListHeading';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
	}, []);

	const saveToLocalStorage = useCallback((items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	}, []);

	const addTodo = useCallback((text) => {
		const newTodo = {
			id: Date.now(),
			text: text,
			completed: false
		};
		setTodos(prevTodos => {
			const newTodos = [...prevTodos, newTodo];
			saveToLocalStorage(newTodos);
			return newTodos;
		});
	}, [saveToLocalStorage]);

	const toggleTodo = useCallback((id) => {
		setTodos(prevTodos => {
			const newTodos = prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			);
			saveToLocalStorage(newTodos);
			return newTodos;
		});
	}, [saveToLocalStorage]);

	const deleteTodo = useCallback((id) => {
		setTodos(prevTodos => {
			const newTodos = prevTodos.filter((todo) => todo.id !== id);
			saveToLocalStorage(newTodos);
			return newTodos;
		});
	}, [saveToLocalStorage]);

	const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);
	const totalCount = todos.length;

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='My Todos' />
			</div>
			{totalCount > 0 && (
				<div className='todo-stats mb-4'>
					<p className='todo-stats-text'>
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
