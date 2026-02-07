import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todos';

const buildTodo = (text) => ({
	id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
	text,
	completed: false,
	createdAt: new Date().toISOString(),
});

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed)) {
					setTodos(parsed);
				}
			} catch (error) {
				setTodos([]);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const remainingCount = useMemo(
		() => todos.filter((todo) => !todo.completed).length,
		[todos]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		const trimmed = text.trim();
		if (!trimmed) {
			return;
		}

		setTodos((current) => [buildTodo(trimmed), ...current]);
		setText('');
	};

	const toggleTodo = (id) => {
		setTodos((current) =>
			current.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const removeTodo = (id) => {
		setTodos((current) => current.filter((todo) => todo.id !== id));
	};

	const clearCompleted = () => {
		setTodos((current) => current.filter((todo) => !todo.completed));
	};

	return (
		<div className='container todo-page'>
			<div className='row align-items-center mt-4 mb-3'>
				<div className='col'>
					<h2 className='mb-1'>Todo List</h2>
					<p className='text-muted mb-0'>
						{remainingCount === 0
							? 'All caught up.'
							: `${remainingCount} task${remainingCount === 1 ? '' : 's'} remaining`}
					</p>
				</div>
				<div className='col-auto'>
					<button
						className='btn btn-outline-light btn-sm'
						type='button'
						onClick={clearCompleted}
						disabled={!todos.some((todo) => todo.completed)}
					>
						Clear completed
					</button>
				</div>
			</div>

			<form className='row g-2 align-items-center' onSubmit={handleSubmit}>
				<div className='col-12 col-md-9'>
					<input
						className='form-control'
						type='text'
						placeholder='Add a new task'
						value={text}
						onChange={(event) => setText(event.target.value)}
					/>
				</div>
				<div className='col-12 col-md-3 d-grid'>
					<button className='btn btn-primary' type='submit'>
						Add task
					</button>
				</div>
			</form>

			<div className='row mt-4'>
				<div className='col'>
					{todos.length === 0 ? (
						<div className='todo-empty'>No tasks yet. Add one above.</div>
					) : (
						<ul className='list-group'>
							{todos.map((todo) => (
								<li
									key={todo.id}
									className={`list-group-item todo-item ${
										todo.completed ? 'completed' : ''
									}`}
								>
									<div className='form-check'>
										<input
											className='form-check-input'
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											id={`todo-${todo.id}`}
										/>
										<label
											className='form-check-label'
											htmlFor={`todo-${todo.id}`}
										>
											{todo.text}
										</label>
									</div>
									<button
										className='btn btn-sm btn-outline-light'
										type='button'
										onClick={() => removeTodo(todo.id)}
									>
										Remove
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
