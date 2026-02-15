import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import MovieListHeading from './MovieListHeading';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);

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
		const newTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const completedCount = todos.filter(todo => todo.completed).length;
	const totalCount = todos.length;

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='My Todos' />
			</div>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					<TodoInput onAdd={addTodo} />
					{totalCount > 0 && (
						<div className='todo-stats mb-3'>
							<span>{completedCount} of {totalCount} completed</span>
						</div>
					)}
					<div className='todo-list'>
						{todos.length === 0 ? (
							<div className='text-center mt-5'>
								<p>No todos yet. Add one above!</p>
							</div>
						) : (
							todos.map(todo => (
								<TodoItem
									key={todo.id}
									todo={todo}
									onToggle={toggleTodo}
									onDelete={deleteTodo}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
