import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
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

	const addTodo = () => {
		if (inputValue.trim() === '') {
			openSnackbar('Please enter a todo item');
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: inputValue.trim(),
			completed: false
		};

		const newTodoList = [...todos, newTodo];
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
		setInputValue('');
	};

	const toggleTodo = (id) => {
		const newTodoList = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
	};

	const deleteTodo = (id) => {
		const newTodoList = todos.filter(todo => todo.id !== id);
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<h1 className='col-sm-12 col-md-6'>Todo List</h1>
			</div>
			<div className='row mb-4'>
				<div className='col-sm-12 col-md-8 d-flex'>
					<input
						type='text'
						className='form-control'
						placeholder='Add a new todo...'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
						style={{ marginRight: '10px' }}
					/>
					<button
						className='btn btn-primary'
						onClick={addTodo}
					>
						Add Todo
					</button>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm-12 col-md-8'>
					{todos.length === 0 ? (
						<div className='text-center mt-4'>
							<p>No todos yet. Add one above!</p>
						</div>
					) : (
						<ul className='list-group'>
							{todos.map((todo) => (
								<li
									key={todo.id}
									className='list-group-item d-flex justify-content-between align-items-center'
									style={{
										backgroundColor: '#2d2d2d',
										borderColor: '#444',
										color: '#fff',
										textDecoration: todo.completed ? 'line-through' : 'none',
										opacity: todo.completed ? 0.6 : 1
									}}
								>
									<div className='d-flex align-items-center'>
										<input
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											style={{ marginRight: '15px', cursor: 'pointer' }}
										/>
										<span>{todo.text}</span>
									</div>
									<button
										className='btn btn-danger btn-sm'
										onClick={() => deleteTodo(todo.id)}
									>
										Delete
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
