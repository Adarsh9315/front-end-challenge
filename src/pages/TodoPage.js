import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import '../App.css';

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

	const completedCount = todos.filter(todo => todo.completed).length;
	const totalCount = todos.length;

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1 className='text-white'>Todo List</h1>
					<p className='text-white-50'>
						{completedCount} of {totalCount} tasks completed
					</p>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-8 offset-md-2'>
					<AddTodo onAdd={addTodo} />
				</div>
			</div>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
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
