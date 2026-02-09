import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todos';

const loadTodos = () => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

const saveTodos = (todos) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');
	const [filter, setFilter] = useState('all'); // all | active | completed

	useEffect(() => {
		setTodos(loadTodos());
	}, []);

	useEffect(() => {
		saveTodos(todos);
	}, [todos]);

	const counts = useMemo(() => {
		const total = todos.length;
		const completed = todos.filter((t) => t.completed).length;
		const active = total - completed;
		return { total, active, completed };
	}, [todos]);

	const visibleTodos = useMemo(() => {
		if (filter === 'active') return todos.filter((t) => !t.completed);
		if (filter === 'completed') return todos.filter((t) => t.completed);
		return todos;
	}, [todos, filter]);

	const addTodo = () => {
		const trimmed = text.trim();
		if (!trimmed) return;

		setTodos((prev) => [
			{ id: createId(), text: trimmed, completed: false, createdAt: Date.now() },
			...prev,
		]);
		setText('');
	};

	const toggleTodo = (id) => {
		setTodos((prev) =>
			prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
		);
	};

	const removeTodo = (id) => {
		setTodos((prev) => prev.filter((t) => t.id !== id));
	};

	const clearCompleted = () => {
		setTodos((prev) => prev.filter((t) => !t.completed));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addTodo();
	};

	return (
		<div className='todo-page'>
			<div className='row align-items-center mb-3'>
				<div className='col'>
					<h2 className='m-0'>Todo</h2>
					<div className='text-muted small'>
						{counts.active} active · {counts.completed} completed · {counts.total} total
					</div>
				</div>
				<div className='col-auto'>
					<button
						className='btn btn-outline-light btn-sm'
						onClick={clearCompleted}
						disabled={counts.completed === 0}
					>
						Clear completed
					</button>
				</div>
			</div>

			<form onSubmit={onSubmit} className='row align-items-center mb-3'>
				<div className='col'>
					<input
						type='text'
						className='form-control'
						placeholder='Add a task'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<div className='col-auto'>
					<button type='submit' className='btn btn-light'>
						Add
					</button>
				</div>
			</form>

			<ul className='nav nav-pills mb-3'>
				<li className='nav-item'>
					<button
						className={`nav-link ${filter === 'all' ? 'active' : ''}`}
						onClick={() => setFilter('all')}
						type='button'
					>
						All
					</button>
				</li>
				<li className='nav-item'>
					<button
						className={`nav-link ${filter === 'active' ? 'active' : ''}`}
						onClick={() => setFilter('active')}
						type='button'
					>
						Active
					</button>
				</li>
				<li className='nav-item'>
					<button
						className={`nav-link ${filter === 'completed' ? 'active' : ''}`}
						onClick={() => setFilter('completed')}
						type='button'
					>
						Completed
					</button>
				</li>
			</ul>

			{visibleTodos.length === 0 ? (
				<div className='todo-empty text-muted'>No tasks here yet.</div>
			) : (
				<div className='list-group todo-list'>
					{visibleTodos.map((todo) => (
						<div key={todo.id} className='list-group-item todo-item'>
							<div className='d-flex align-items-center'>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										checked={!!todo.completed}
										onChange={() => toggleTodo(todo.id)}
										id={`todo-${todo.id}`}
									/>
									<label
										className={`form-check-label ${todo.completed ? 'todo-completed' : ''}`}
										htmlFor={`todo-${todo.id}`}
									>
										{todo.text}
									</label>
								</div>
								<div className='ml-auto'>
									<button
										className='btn btn-sm btn-outline-danger'
										onClick={() => removeTodo(todo.id)}
										type='button'
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TodoPage;
