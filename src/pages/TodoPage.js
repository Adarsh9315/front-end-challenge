import React, { useState, useEffect } from 'react';
import '../App.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		setTodos(savedTodos);
	}, []);

	const saveTodos = (todoList) => {
		localStorage.setItem('todos', JSON.stringify(todoList));
		setTodos(todoList);
	};

	const addTodo = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') return;

		const newTodo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
		};

		const updatedTodos = [...todos, newTodo];
		saveTodos(updatedTodos);
		setInputValue('');
	};

	const toggleTodo = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		saveTodos(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		saveTodos(updatedTodos);
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row justify-content-center mt-5'>
				<div className='col-md-8 col-lg-6'>
					<h1 className='text-center mb-4'>Todo List</h1>
					
					<form onSubmit={addTodo} className='mb-4'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Add a new todo...'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								style={{
									backgroundColor: '#2a2a2a',
									color: '#ffffff',
									border: '1px solid #444',
								}}
							/>
							<div className='input-group-append'>
								<button
									className='btn btn-primary'
									type='submit'
									style={{ padding: '0 30px' }}
								>
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
									style={{
										backgroundColor: '#2a2a2a',
										borderRadius: '5px',
										border: '1px solid #444',
									}}
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

					<div className='mt-4 text-center'>
						<p className='text-muted'>
							Total: {todos.length} | Completed: {todos.filter((t) => t.completed).length}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
