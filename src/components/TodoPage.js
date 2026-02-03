import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoPage.css';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('all');

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
				completed: false,
				createdAt: new Date().toISOString()
			};
			const newTodoList = [...todos, newTodo];
			setTodos(newTodoList);
			saveToLocalStorage(newTodoList);
			setInputValue('');
		}
	};

	const toggleTodo = (id) => {
		const newTodoList = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
	};

	const deleteTodo = (id) => {
		const newTodoList = todos.filter(todo => todo.id !== id);
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
	};

	const clearCompleted = () => {
		const newTodoList = todos.filter(todo => !todo.completed);
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
	};

	const filteredTodos = todos.filter(todo => {
		if (filter === 'active') return !todo.completed;
		if (filter === 'completed') return todo.completed;
		return true;
	});

	const completedCount = todos.filter(todo => todo.completed).length;
	const activeCount = todos.filter(todo => !todo.completed).length;

	return (
		<div className='container-fluid todo-app'>
			<div className='row justify-content-center mt-4'>
				<div className='col-md-8 col-lg-6'>
					<div className='todo-container'>
						<h1 className='text-center mb-4'>Todo List</h1>
						
						<div className='input-group mb-4'>
							<input
								type='text'
								className='form-control'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyPress={(e) => e.key === 'Enter' && addTodo()}
								placeholder='What needs to be done?'
							/>
							<div className='input-group-append'>
								<button className='btn btn-primary' onClick={addTodo}>
									Add
								</button>
							</div>
						</div>

						<div className='filter-buttons mb-3 d-flex justify-content-center'>
							<button 
								className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => setFilter('all')}
							>
								All ({todos.length})
							</button>
							<button 
								className={`btn btn-sm ml-2 ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => setFilter('active')}
							>
								Active ({activeCount})
							</button>
							<button 
								className={`btn btn-sm ml-2 ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => setFilter('completed')}
							>
								Completed ({completedCount})
							</button>
						</div>

						<div className='todo-list'>
							{filteredTodos.map(todo => (
								<div key={todo.id} className='todo-item'>
									<div className='form-check'>
										<input
											type='checkbox'
											className='form-check-input'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
										/>
										<label className={`form-check-label ${todo.completed ? 'completed' : ''}`}>
											{todo.text}
										</label>
									</div>
									<button 
										className='btn btn-sm btn-outline-danger'
										onClick={() => deleteTodo(todo.id)}
									>
										Delete
									</button>
								</div>
							))}
						</div>

						{todos.length > 0 && (
							<div className='todo-footer mt-3 d-flex justify-content-between align-items-center'>
								<span className='text-muted'>
									{activeCount} {activeCount === 1 ? 'item' : 'items'} left
								</span>
								<button 
									className='btn btn-sm btn-outline-secondary'
									onClick={clearCompleted}
									disabled={completedCount === 0}
								>
									Clear Completed
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoPage;