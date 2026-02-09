import React, { useState, useEffect } from 'react';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		setTodos(savedTodos);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') return;

		const newTodo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
		};

		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		setInputValue('');
	};

	const toggleTodo = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex justify-content-center mt-5'>
				<div className='col-md-8'>
					<h1 className='text-center mb-4'>Todo List</h1>
					
					<form onSubmit={addTodo} className='mb-4'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Add a new todo...'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<div className='input-group-append'>
								<button className='btn btn-primary' type='submit'>
									Add
								</button>
							</div>
						</div>
					</form>

					<div className='todo-list'>
						{todos.length === 0 ? (
							<p className='text-center text-muted'>No todos yet. Add one above!</p>
						) : (
							todos.map((todo) => (
								<div
									key={todo.id}
									className='todo-item d-flex align-items-center justify-content-between mb-3 p-3'
								>
									<div className='d-flex align-items-center flex-grow-1'>
										<input
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											className='mr-3'
											style={{ width: '20px', height: '20px', cursor: 'pointer' }}
										/>
										<span
											style={{
												textDecoration: todo.completed ? 'line-through' : 'none',
												opacity: todo.completed ? 0.6 : 1,
												cursor: 'pointer',
											}}
											onClick={() => toggleTodo(todo.id)}
										>
											{todo.text}
										</span>
									</div>
									<button
										className='btn btn-danger btn-sm'
										onClick={() => deleteTodo(todo.id)}
									>
										Delete
									</button>
								</div>
							))
						)}
					</div>

					{todos.length > 0 && (
						<div className='text-center mt-4'>
							<p className='text-muted'>
								{todos.filter((t) => !t.completed).length} of {todos.length} tasks remaining
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Todo;
