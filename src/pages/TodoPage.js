import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import MovieListHeading from '../components/MovieListHeading';

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
			completed: false,
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

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Todo List' />
			</div>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{totalCount > 0 && (
						<div className='mb-4 text-center' style={{ opacity: 0.8 }}>
							<span style={{ fontSize: '1.1em' }}>
								{completedCount} of {totalCount} completed
							</span>
						</div>
					)}
					<AddTodo addTodo={addTodo} />
					<TodoList
						todos={todos}
						toggleTodo={toggleTodo}
						deleteTodo={deleteTodo}
					/>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
