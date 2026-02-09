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

	const completedCount = todos.filter((t) => t.completed).length;

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Todos</h1>
				</div>
			</div>

			<div className='todo-input-container mb-4'>
				<div className='input-group' style={{ maxWidth: '600px' }}>
					<input
						type='text'
						className='form-control'
						placeholder='Add a new todo...'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<div className='input-group-append'>
						<button
							className='btn btn-light'
							onClick={addTodo}
						>
							Add
						</button>
					</div>
				</div>
			</div>

			{todos.length > 0 && (
				<div className='mb-3' style={{ fontSize: '0.9em', color: '#aaa' }}>
					{completedCount} of {todos.length} completed
				</div>
			)}

			<div className='todo-list'>
				{todos.length === 0 ? (
					<p style={{ color: '#888' }}>No todos yet. Add one above!</p>
				) : (
					todos.map((todo) => (
						<div
							key={todo.id}
							className='todo-item d-flex align-items-center justify-content-between'
						>
							<div
								className='d-flex align-items-center flex-grow-1'
								onClick={() => toggleTodo(todo.id)}
								style={{ cursor: 'pointer' }}
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
										backgroundColor: todo.completed ? '#4caf50' : 'transparent',
										flexShrink: 0,
									}}
								>
									{todo.completed && (
										<span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
											&#10003;
										</span>
									)}
								</span>
								<span
									className='todo-text'
									style={{
										textDecoration: todo.completed ? 'line-through' : 'none',
										color: todo.completed ? '#888' : '#fff',
										fontSize: '1.1em',
									}}
								>
									{todo.text}
								</span>
							</div>
							<button
								className='btn btn-sm btn-outline-danger ml-3'
								onClick={() => deleteTodo(todo.id)}
							>
								Delete
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default TodoPage;
