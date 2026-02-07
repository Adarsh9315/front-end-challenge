import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todo-items';

const createTodo = (text) => ({
	id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
	text,
	completed: false
});

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [draft, setDraft] = useState('');

	useEffect(() => {
		const savedTodos = localStorage.getItem(STORAGE_KEY);
		if (savedTodos) {
			setTodos(JSON.parse(savedTodos));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const remainingCount = useMemo(
		() => todos.filter((todo) => !todo.completed).length,
		[todos]
	);
	const completedCount = todos.length - remainingCount;

	const handleSubmit = (event) => {
		event.preventDefault();
		const trimmed = draft.trim();
		if (!trimmed) {
			return;
		}
		setTodos((current) => [createTodo(trimmed), ...current]);
		setDraft('');
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
		<div className='container-fluid todo-page'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Todo</h1>
					<p className='text-muted'>
						{remainingCount} remaining · {completedCount} completed
					</p>
				</div>
			</div>
			<div className='row'>
				<div className='col-lg-7 col-md-9'>
					<div className='todo-card'>
						<form className='todo-form' onSubmit={handleSubmit}>
							<input
								className='form-control'
								value={draft}
								onChange={(event) => setDraft(event.target.value)}
								placeholder='Add a task...'
							/>
							<button className='btn btn-primary' type='submit'>
								Add
							</button>
						</form>
						<div className='todo-list'>
							{todos.length === 0 ? (
								<div className='todo-empty'>No tasks yet.</div>
							) : (
								todos.map((todo) => (
									<div
										key={todo.id}
										className={`todo-item${todo.completed ? ' completed' : ''}`}
									>
										<label className='todo-checkbox'>
											<input
												type='checkbox'
												checked={todo.completed}
												onChange={() => toggleTodo(todo.id)}
											/>
											<span>{todo.text}</span>
										</label>
										<button
											className='btn btn-sm btn-outline-light'
											type='button'
											onClick={() => removeTodo(todo.id)}
										>
											Remove
										</button>
									</div>
								))
							)}
						</div>
						<div className='todo-actions'>
							<span>{remainingCount} items left</span>
							<button
								className='btn btn-link text-light'
								type='button'
								onClick={clearCompleted}
								disabled={completedCount === 0}
							>
								Clear completed
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
