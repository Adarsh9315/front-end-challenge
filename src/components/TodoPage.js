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

	const toggleTodo = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const removeTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			addTodo();
		}
	};

	return (
		<div className='container mt-5' style={{ maxWidth: '700px' }}>
			<h1 className='mb-4'>Todo List</h1>

			<div className='input-group mb-4'>
				<input
					type='text'
					className='form-control'
					placeholder='Add a new todo...'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={handleKeyPress}
					style={{
						backgroundColor: '#2a2a2a',
						border: '1px solid #444',
						color: '#fff',
					}}
				/>
				<div className='input-group-append'>
					<button
						className='btn btn-primary'
						onClick={addTodo}
						style={{ backgroundColor: '#e50914', borderColor: '#e50914' }}
					>
						Add
					</button>
				</div>
			</div>

			{todos.length === 0 ? (
				<p className='text-muted text-center mt-5'>
					No todos yet. Add one above!
				</p>
			) : (
				<ul className='list-group'>
					{todos.map((todo) => (
						<li
							key={todo.id}
							className='list-group-item d-flex justify-content-between align-items-center'
							style={{
								backgroundColor: '#1c1c1c',
								border: '1px solid #333',
								color: '#fff',
								marginBottom: '8px',
								borderRadius: '4px',
							}}
						>
							<div
								className='d-flex align-items-center'
								style={{ cursor: 'pointer', flex: 1 }}
								onClick={() => toggleTodo(todo.id)}
							>
								<span
									style={{
										width: '20px',
										height: '20px',
										borderRadius: '50%',
										border: '2px solid #e50914',
										display: 'inline-block',
										marginRight: '12px',
										backgroundColor: todo.completed ? '#e50914' : 'transparent',
										flexShrink: 0,
									}}
								/>
								<span
									style={{
										textDecoration: todo.completed ? 'line-through' : 'none',
										opacity: todo.completed ? 0.5 : 1,
									}}
								>
									{todo.text}
								</span>
							</div>
							<button
								className='btn btn-sm'
								onClick={() => removeTodo(todo.id)}
								style={{
									color: '#e50914',
									fontSize: '1.2em',
									lineHeight: 1,
									padding: '2px 8px',
								}}
							>
								&times;
							</button>
						</li>
					))}
				</ul>
			)}

			{todos.length > 0 && (
				<p className='text-muted mt-3 text-center' style={{ fontSize: '0.9em' }}>
					{todos.filter((t) => t.completed).length} of {todos.length} completed
				</p>
			)}
		</div>
	);
};

export default TodoPage;
