import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todos';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		try {
			const storedTodos = localStorage.getItem(STORAGE_KEY);
			if (storedTodos) {
				setTodos(JSON.parse(storedTodos));
			}
		} catch {
			setTodos([]);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const remainingCount = useMemo(
		() => todos.filter((todo) => !todo.completed).length,
		[todos]
	);

	const handleAddTodo = (event) => {
		event.preventDefault();
		const trimmedTodo = newTodo.trim();
		if (!trimmedTodo) {
			return;
		}

		const todo = {
			id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
			text: trimmedTodo,
			completed: false,
		};

		setTodos((prevTodos) => [...prevTodos, todo]);
		setNewTodo('');
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

	const clearCompleted = () => {
		setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
	};

	const totalCount = todos.length;
	const completedCount = totalCount - remainingCount;
	const remainingLabel = remainingCount === 1 ? 'item' : 'items';

	return (
		<div className='todo-page'>
			<div className='todo-card'>
				<div className='d-flex flex-wrap align-items-center justify-content-between mb-3'>
					<div>
						<h1 className='mb-1'>Todo List</h1>
						<p className='text-muted mb-0'>
							{remainingCount} {remainingLabel} remaining
						</p>
					</div>
					<button
						className='btn btn-outline-light'
						onClick={clearCompleted}
						type='button'
						disabled={completedCount === 0}
					>
						Clear completed
					</button>
				</div>
				<form className='todo-form' onSubmit={handleAddTodo}>
					<input
						className='form-control'
						placeholder='Add a new task'
						value={newTodo}
						onChange={(event) => setNewTodo(event.target.value)}
					/>
					<button className='btn btn-primary' type='submit'>
						Add
					</button>
				</form>
				{totalCount === 0 ? (
					<p className='text-muted mb-0'>No todos yet. Add one above.</p>
				) : (
					<ul className='todo-list'>
						{todos.map((todo) => (
							<li className='todo-item' key={todo.id}>
								<div className='todo-text'>
									<input
										type='checkbox'
										checked={todo.completed}
										onChange={() => toggleTodo(todo.id)}
										aria-label={`Mark ${todo.text} as completed`}
									/>
									<span className={todo.completed ? 'todo-completed' : ''}>
										{todo.text}
									</span>
								</div>
								<div className='todo-actions'>
									<button
										className='btn btn-sm btn-outline-light'
										type='button'
										onClick={() => removeTodo(todo.id)}
									>
										Remove
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default TodoPage;
