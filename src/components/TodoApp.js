import React, { useState, useEffect } from 'react';

const TodoApp = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const savedTodos = localStorage.getItem('todos');
		if (savedTodos) {
			setTodos(JSON.parse(savedTodos));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') return;

		const newTodo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
		};

		setTodos([...todos, newTodo]);
		setInputValue('');
	};

	const toggleTodo = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const clearCompleted = () => {
		setTodos(todos.filter((todo) => !todo.completed));
	};

	const activeTodos = todos.filter((todo) => !todo.completed).length;

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<div className="card bg-dark text-white">
						<div className="card-header">
							<h2 className="text-center mb-0">Todo List</h2>
						</div>
						<div className="card-body">
							<form onSubmit={addTodo} className="mb-4">
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										placeholder="Add a new todo..."
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
									/>
									<div className="input-group-append">
										<button className="btn btn-primary" type="submit">
											Add
										</button>
									</div>
								</div>
							</form>

							{todos.length === 0 ? (
								<p className="text-center text-muted">No todos yet. Add one above!</p>
							) : (
								<>
									<ul className="list-group mb-3">
										{todos.map((todo) => (
											<li
												key={todo.id}
												className="list-group-item bg-secondary text-white d-flex align-items-center"
											>
												<input
													type="checkbox"
													className="mr-3"
													checked={todo.completed}
													onChange={() => toggleTodo(todo.id)}
													style={{ cursor: 'pointer', width: '20px', height: '20px' }}
												/>
												<span
													style={{
														textDecoration: todo.completed ? 'line-through' : 'none',
														opacity: todo.completed ? 0.6 : 1,
														flex: 1,
													}}
												>
													{todo.text}
												</span>
												<button
													className="btn btn-danger btn-sm"
													onClick={() => deleteTodo(todo.id)}
												>
													Delete
												</button>
											</li>
										))}
									</ul>

									<div className="d-flex justify-content-between align-items-center">
										<span className="text-muted">
											{activeTodos} {activeTodos === 1 ? 'item' : 'items'} left
										</span>
										{todos.some((todo) => todo.completed) && (
											<button
												className="btn btn-warning btn-sm"
												onClick={clearCompleted}
											>
												Clear Completed
											</button>
										)}
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoApp;
