import React, { useEffect, useMemo, useState } from 'react';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		setTodos(storedTodos);
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const remainingCount = useMemo(
		() => todos.filter((todo) => !todo.completed).length,
		[todos]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		const trimmedText = text.trim();
		if (!trimmedText) {
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: trimmedText,
			completed: false
		};

		setTodos((prevTodos) => [newTodo, ...prevTodos]);
		setText('');
	};

	const toggleTodo = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const removeTodo = (id) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	return (
		<div className='container todo-app'>
			<div className='todo-card'>
				<div className='todo-header'>
					<h1>Todo List</h1>
					<p>
						{todos.length === 0
							? 'Start by adding your first task.'
							: `${remainingCount} task${
									remainingCount === 1 ? '' : 's'
							  } remaining`}
					</p>
				</div>
				<form className='todo-form' onSubmit={handleSubmit}>
					<div className='input-group'>
						<input
							type='text'
							className='form-control'
							placeholder='Add a new task'
							value={text}
							onChange={(event) => setText(event.target.value)}
							aria-label='Add a new task'
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
						<div className='todo-empty'>Nothing here yet.</div>
					) : (
						todos.map((todo) => (
							<div className='todo-item' key={todo.id}>
								<div
									className={`todo-text${
										todo.completed ? ' completed' : ''
									}`}
								>
									{todo.text}
								</div>
								<div className='todo-actions'>
									<button
										className='btn btn-outline-light btn-sm'
										type='button'
										onClick={() => toggleTodo(todo.id)}
									>
										{todo.completed ? 'Undo' : 'Done'}
									</button>
									<button
										className='btn btn-outline-danger btn-sm'
										type='button'
										onClick={() => removeTodo(todo.id)}
									>
										Remove
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
