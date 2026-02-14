import React, { useState, useEffect } from 'react';

const TodoPage = () => {
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
		if (inputValue.trim()) {
			const newTodo = {
				id: Date.now(),
				text: inputValue,
				completed: false
			};
			setTodos([...todos, newTodo]);
			setInputValue('');
		}
	};

	const toggleTodo = (id) => {
		setTodos(todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		));
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	return (
		<div className="todo-page">
			<div className="todo-container">
				<h1 className="todo-title">My Todo List</h1>

				<form onSubmit={addTodo} className="todo-form">
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Add a new task..."
						className="todo-input"
					/>
					<button type="submit" className="todo-add-btn">Add</button>
				</form>

				<div className="todo-list">
					{todos.length === 0 ? (
						<p className="todo-empty">No tasks yet. Add one above!</p>
					) : (
						todos.map(todo => (
							<div key={todo.id} className="todo-item">
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
									className="todo-checkbox"
								/>
								<span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
									{todo.text}
								</span>
								<button
									onClick={() => deleteTodo(todo.id)}
									className="todo-delete-btn"
								>
									Delete
								</button>
							</div>
						))
					)}
				</div>

				<div className="todo-stats">
					<span>Total: {todos.length}</span>
					<span>Completed: {todos.filter(t => t.completed).length}</span>
					<span>Pending: {todos.filter(t => !t.completed).length}</span>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
