import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
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

	const completedCount = todos.filter((todo) => todo.completed).length;
	const totalCount = todos.length;
	const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

	return (
		<div className='todo-app'>
			<div className='mb-4 mt-2'>
				<MovieListHeading heading='My Todos' subtitle='Stay organized' />
			</div>

			{totalCount > 0 && (
				<div className='todo-stats mb-4'>
					<p>
						{completedCount} of {totalCount} completed
					</p>
					<div className='todo-progress-bar'>
						<div
							className='todo-progress-fill'
							style={{ width: `${progressPercent}%` }}
						/>
					</div>
				</div>
			)}

			<AddTodo onAdd={addTodo} />
			<TodoList
				todos={todos}
				onToggle={toggleTodo}
				onDelete={deleteTodo}
			/>
		</div>
	);
};

export default TodoPage;
