import React, { useState, useEffect } from 'react';
import '../App.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
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
			createdAt: new Date().toISOString()
		};

		const newTodoList = [...todos, newTodo];
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
		setInputValue('');
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
	};

	const clearCompleted = () => {
		const updatedTodos = todos.filter(todo => !todo.completed);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const getFilteredTodos = () => {
		switch (filter) {
			case 'active':
				return todos.filter(todo => !todo.completed);
			case 'completed':
				return todos.filter(todo => todo.completed);
			default:
				return todos;
		}
	};

	const filteredTodos = getFilteredTodos();
	const activeTodoCount = todos.filter(todo => !todo.completed).length;

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex justify-content-center mt-5'>
				<div className='col-md-8 col-lg-6'>
					<div className='todo-header text-center mb-4'>
						<h1 className='todo-title'>My Todo List</h1>
						<p className='todo-subtitle'>Keep track of your tasks</p>
					</div>

					<form onSubmit={addTodo} className='mb-4'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control todo-input'
								placeholder='What needs to be done?'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<div className='input-group-append'>
								<button className='btn btn-primary add-todo-btn' type='submit'>
									Add
								</button>
							</div>
						</div>
					</form>

					<div className='todo-stats mb-3'>
						<span className='text-muted'>
							{activeTodoCount} {activeTodoCount === 1 ? 'task' : 'tasks'} remaining
						</span>
					</div>

					<div className='todo-filters mb-4'>
						<button
							className={`btn btn-sm mr-2 ${filter === 'all' ? 'btn-info' : 'btn-outline-info'}`}
							onClick={() => setFilter('all')}
						>
							All
						</button>
						<button
							className={`btn btn-sm mr-2 ${filter === 'active' ? 'btn-info' : 'btn-outline-info'}`}
							onClick={() => setFilter('active')}
						>
							Active
						</button>
						<button
							className={`btn btn-sm mr-2 ${filter === 'completed' ? 'btn-info' : 'btn-outline-info'}`}
							onClick={() => setFilter('completed')}
						>
							Completed
						</button>
						{todos.some(todo => todo.completed) && (
							<button
								className='btn btn-sm btn-outline-danger float-right'
								onClick={clearCompleted}
							>
								Clear Completed
							</button>
						)}
					</div>

					<div className='todo-list'>
						{filteredTodos.length === 0 ? (
							<div className='text-center text-muted py-5'>
								<p>No tasks to display</p>
							</div>
						) : (
							filteredTodos.map(todo => (
								<div key={todo.id} className='todo-item mb-2'>
									<div className='d-flex align-items-center'>
										<input
											type='checkbox'
											className='mr-3 todo-checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
										/>
										<span
											className={`flex-grow-1 todo-text ${todo.completed ? 'todo-completed' : ''}`}
											onClick={() => toggleTodo(todo.id)}
											style={{ cursor: 'pointer' }}
										>
											{todo.text}
										</span>
										<button
											className='btn btn-sm btn-danger delete-btn'
											onClick={() => deleteTodo(todo.id)}
										>
											Delete
										</button>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
