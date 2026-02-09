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
		if (inputValue.trim() !== '') {
			const newTodo = {
				id: Date.now(),
				text: inputValue,
				completed: false
			};
			const newTodos = [...todos, newTodo];
			setTodos(newTodos);
			saveToLocalStorage(newTodos);
			setInputValue('');
		}
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

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row justify-content-center mt-5'>
				<div className='col-md-8'>
					<h1 className='text-center mb-4'>Todo List</h1>
					<div className='input-group mb-4'>
						<input
							type='text'
							className='form-control todo-input'
							placeholder='Add a new todo...'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<div className='input-group-append'>
							<button
								className='btn btn-primary'
								onClick={addTodo}
							>
								Add
							</button>
						</div>
					</div>
					<div className='todo-list'>
						{todos.length === 0 ? (
							<p className='text-center text-muted'>No todos yet. Add one to get started!</p>
						) : (
							todos.map((todo) => (
								<div
									key={todo.id}
									className={`todo-item ${todo.completed ? 'completed' : ''}`}
								>
									<div className='d-flex align-items-center'>
										<input
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											className='mr-3'
										/>
										<span
											className='flex-grow-1'
											style={{
												textDecoration: todo.completed ? 'line-through' : 'none',
												opacity: todo.completed ? 0.6 : 1
											}}
										>
											{todo.text}
										</span>
										<button
											className='btn btn-danger btn-sm'
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
