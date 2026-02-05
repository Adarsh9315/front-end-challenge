import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todos';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) {
			return;
		}
		try {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				setTodos(parsed);
			}
		} catch {
			// Ignore malformed stored todos.
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const addTodo = (event) => {
		event.preventDefault();
		const trimmed = text.trim();
		if (!trimmed) {
			return;
		}
		const nextTodo = {
			id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
			text: trimmed,
			completed: false,
		};
		setTodos((prevTodos) => [nextTodo, ...prevTodos]);
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

	const clearCompleted = () => {
		setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
	};

	const remaining = todos.filter((todo) => !todo.completed).length;

	const filteredTodos = useMemo(() => {
		if (filter === 'active') {
			return todos.filter((todo) => !todo.completed);
		}
		if (filter === 'completed') {
			return todos.filter((todo) => todo.completed);
		}
		return todos;
	}, [todos, filter]);

	return (
		<div className='todo-page'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<h2 className='mb-0'>Todos</h2>
			</div>
			<form className='todo-form' onSubmit={addTodo}>
				<input
					className='form-control'
					placeholder='Add a new task'
					value={text}
					onChange={(event) => setText(event.target.value)}
				/>
				<button type='submit' className='btn btn-primary'>
					Add
				</button>
			</form>
			<div className='todo-controls'>
				<span>
					{remaining} item{remaining === 1 ? '' : 's'} left
				</span>
				<div className='btn-group' role='group' aria-label='Todo filters'>
					<button
						type='button'
						className={`btn btn-sm ${filter === 'all' ? 'btn-light' : 'btn-outline-light'}`}
						onClick={() => setFilter('all')}
					>
						All
					</button>
					<button
						type='button'
						className={`btn btn-sm ${filter === 'active' ? 'btn-light' : 'btn-outline-light'}`}
						onClick={() => setFilter('active')}
					>
						Active
					</button>
					<button
						type='button'
						className={`btn btn-sm ${filter === 'completed' ? 'btn-light' : 'btn-outline-light'}`}
						onClick={() => setFilter('completed')}
					>
						Completed
					</button>
				</div>
				<button
					type='button'
					className='btn btn-sm btn-link text-light'
					onClick={clearCompleted}
					disabled={todos.every((todo) => !todo.completed)}
				>
					Clear completed
				</button>
			</div>
			{filteredTodos.length === 0 ? (
				<div className='todo-empty'>No todos yet. Add one above.</div>
			) : (
				<ul className='todo-list'>
					{filteredTodos.map((todo) => (
						<li
							key={todo.id}
							className={`todo-item ${todo.completed ? 'completed' : ''}`}
						>
							<label className='todo-label'>
								<input
									type='checkbox'
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
								/>
								<span>{todo.text}</span>
							</label>
							<button
								type='button'
								className='btn btn-sm btn-outline-light'
								onClick={() => removeTodo(todo.id)}
							>
								Remove
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TodoPage;
