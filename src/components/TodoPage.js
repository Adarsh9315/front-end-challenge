import React, { useState, useEffect } from 'react';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

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
		if (inputValue.trim() === '') return;
		
		const newTodo = {
			id: Date.now(),
			text: inputValue,
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

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1 className='mb-4'>Todo List</h1>
				</div>
			</div>
			
			<div className='row mb-4'>
				<div className='col-12 col-md-8'>
					<div className='input-group'>
						<input
							type='text'
							className='form-control'
							placeholder='Add a new todo...'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && addTodo()}
						/>
						<div className='input-group-append'>
							<button className='btn btn-primary' onClick={addTodo}>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='row'>
				<div className='col-12'>
					{todos.length === 0 ? (
						<div className='text-center mt-5'>
							<h4>No todos yet. Add one above!</h4>
						</div>
					) : (
						<div className='list-group'>
							{todos.map((todo) => (
								<div
									key={todo.id}
									className='list-group-item d-flex justify-content-between align-items-center'
								>
									<div className='d-flex align-items-center'>
										<input
											type='checkbox'
											className='mr-3'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
										/>
										<span
											style={{
												textDecoration: todo.completed ? 'line-through' : 'none',
												color: todo.completed ? '#6c757d' : 'inherit'
											}}
										>
											{todo.text}
										</span>
									</div>
									<button
										className='btn btn-sm btn-danger'
										onClick={() => deleteTodo(todo.id)}
									>
										Delete
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className='row mt-4'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<h5 className='card-title'>Summary</h5>
							<p className='card-text'>
								Total todos: {todos.length} | 
								Completed: {todos.filter(todo => todo.completed).length} | 
								Remaining: {todos.filter(todo => !todo.completed).length}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;