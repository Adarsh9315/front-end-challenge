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
		const text = inputValue.trim();
		if (!text) return;

		const newTodo = {
			id: Date.now(),
			text: text,
			completed: false,
		};

		const updatedTodos = [...todos, newTodo];
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
		setInputValue('');
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
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
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Todos</h1>
				</div>
			</div>

			<div className='todo-input-container mb-4'>
				<div className='d-flex'>
					<input
						className='form-control todo-input'
						type='text'
						placeholder='Add a new todo...'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button className='btn btn-light ml-2 todo-add-btn' onClick={addTodo}>
						Add
					</button>
				</div>
			</div>

			{todos.length === 0 ? (
				<p className='text-muted text-center mt-5' style={{ fontSize: '1.2em' }}>
					No todos yet. Add one above!
				</p>
			) : (
				<ul className='todo-list list-unstyled'>
					{todos.map((todo) => (
						<li key={todo.id} className='todo-item d-flex align-items-center justify-content-between'>
							<div
								className='d-flex align-items-center todo-text-container'
								onClick={() => toggleTodo(todo.id)}
								style={{ cursor: 'pointer', flex: 1 }}
							>
								<span
									className='todo-checkbox mr-3'
									style={{
										width: '22px',
										height: '22px',
										borderRadius: '4px',
										border: '2px solid #555',
										display: 'inline-flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: todo.completed ? '#ffffff' : 'transparent',
										flexShrink: 0,
									}}
								>
									{todo.completed && (
										<span style={{ color: '#141414', fontWeight: 'bold', fontSize: '14px' }}>
											&#10003;
										</span>
									)}
								</span>
								<span
									className={todo.completed ? 'todo-completed' : ''}
									style={{ fontSize: '1.1em' }}
								>
									{todo.text}
								</span>
							</div>
							<button
								className='btn btn-sm todo-delete-btn'
								onClick={() => deleteTodo(todo.id)}
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TodoPage;
