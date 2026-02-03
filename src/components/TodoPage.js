import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoPage.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [editText, setEditText] = useState('');

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
		if (inputValue.trim()) {
			const newTodo = {
				id: Date.now(),
				text: inputValue.trim(),
				completed: false
			};
			const newTodos = [...todos, newTodo];
			setTodos(newTodos);
			saveToLocalStorage(newTodos);
			setInputValue('');
		}
	};

	const toggleTodo = (id) => {
		const newTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const startEdit = (id, text) => {
		setEditingId(id);
		setEditText(text);
	};

	const saveEdit = () => {
		if (editText.trim()) {
			const newTodos = todos.map(todo =>
				todo.id === editingId ? { ...todo, text: editText.trim() } : todo
			);
			setTodos(newTodos);
			saveToLocalStorage(newTodos);
			setEditingId(null);
			setEditText('');
		}
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditText('');
	};

	const completedCount = todos.filter(todo => todo.completed).length;
	const totalCount = todos.length;

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1 className='text-center mb-4'>Todo List</h1>
				</div>
			</div>
			
			<div className='row justify-content-center mb-4'>
				<div className='col-md-8'>
					<div className='input-group'>
						<input
							type='text'
							className='form-control'
							placeholder='Add a new todo...'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && addTodo()}
						/>
						<div className='input-group-append'>
							<button className='btn btn-primary' onClick={addTodo}>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='row justify-content-center mb-3'>
				<div className='col-md-8'>
					<div className='todo-stats text-muted'>
						{completedCount} of {totalCount} tasks completed
					</div>
				</div>
			</div>

			<div className='row justify-content-center'>
				<div className='col-md-8'>
					<div className='todo-list'>
						{todos.length === 0 ? (
							<div className='text-center text-muted py-5'>
								<h4>No todos yet. Add one above!</h4>
							</div>
						) : (
							todos.map(todo => (
								<div
									key={todo.id}
									className={`todo-item card mb-3 ${todo.completed ? 'completed' : ''}`}
								>
									<div className='card-body d-flex align-items-center'>
										<div className='custom-control custom-checkbox mr-3'>
											<input
												type='checkbox'
												className='custom-control-input'
												id={`todo-${todo.id}`}
												checked={todo.completed}
												onChange={() => toggleTodo(todo.id)}
											/>
											<label
												className='custom-control-label'
												htmlFor={`todo-${todo.id}`}
											></label>
										</div>
										
										{editingId === todo.id ? (
											<div className='flex-grow-1 d-flex'>
												<input
													type='text'
													className='form-control mr-2'
													value={editText}
													onChange={(e) => setEditText(e.target.value)}
													onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
												/>
												<button
													className='btn btn-success btn-sm mr-2'
													onClick={saveEdit}
												>
													Save
												</button>
												<button
													className='btn btn-secondary btn-sm'
													onClick={cancelEdit}
												>
													Cancel
												</button>
											</div>
										) : (
											<div className='flex-grow-1 d-flex align-items-center justify-content-between'>
												<span className={`todo-text ${todo.completed ? 'text-muted text-decoration-line-through' : ''}`}>
													{todo.text}
												</span>
												<div>
													<button
														className='btn btn-outline-primary btn-sm mr-2'
														onClick={() => startEdit(todo.id, todo.text)}
														disabled={todo.completed}
													>
														Edit
													</button>
													<button
														className='btn btn-outline-danger btn-sm'
														onClick={() => deleteTodo(todo.id)}
													>
														Delete
													</button>
												</div>
											</div>
										)}
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;