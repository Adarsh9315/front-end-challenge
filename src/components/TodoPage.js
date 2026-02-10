import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [openSnackbar] = useSnackbar();

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos'));
		if (savedTodos) {
			setTodos(savedTodos);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') {
			openSnackbar('Please enter a todo');
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: inputValue,
			completed: false
		};

		const newTodoList = [...todos, newTodo];
		setTodos(newTodoList);
		saveToLocalStorage(newTodoList);
		setInputValue('');
		openSnackbar('Todo added successfully');
	};

	const toggleTodo = (id) => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter(todo => todo.id !== id);
		setTodos(updatedTodos);
		saveToLocalStorage(updatedTodos);
		openSnackbar('Todo deleted');
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>My Todos</h1>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<form onSubmit={addTodo} className='mb-4'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Add a new todo...'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								style={{
									background: '#1a1a1a',
									color: '#fff',
									border: '1px solid #333'
								}}
							/>
							<div className='input-group-append'>
								<button
									className='btn btn-primary'
									type='submit'
									style={{
										background: '#fff',
										color: '#141414',
										border: 'none',
										padding: '0 30px'
									}}
								>
									Add
								</button>
							</div>
						</div>
					</form>

					<div className='todo-list'>
						{todos.length === 0 ? (
							<p style={{ textAlign: 'center', color: '#aaa', marginTop: '40px' }}>
								No todos yet. Add one above!
							</p>
						) : (
							todos.map((todo) => (
								<div
									key={todo.id}
									className='todo-item'
									style={{
										background: '#1a1a1a',
										padding: '15px 20px',
										marginBottom: '10px',
										borderRadius: '4px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										border: '1px solid #333'
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											flex: 1,
											cursor: 'pointer'
										}}
										onClick={() => toggleTodo(todo.id)}
									>
										<input
											type='checkbox'
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											style={{
												marginRight: '15px',
												cursor: 'pointer',
												width: '18px',
												height: '18px'
											}}
										/>
										<span
											style={{
												textDecoration: todo.completed ? 'line-through' : 'none',
												color: todo.completed ? '#666' : '#fff',
												fontSize: '1rem'
											}}
										>
											{todo.text}
										</span>
									</div>
									<button
										onClick={() => deleteTodo(todo.id)}
										className='btn btn-sm'
										style={{
											background: '#ff4444',
											color: '#fff',
											border: 'none',
											padding: '5px 15px'
										}}
									>
										Delete
									</button>
								</div>
							))
						)}
					</div>

					{todos.length > 0 && (
						<div style={{ marginTop: '20px', textAlign: 'center', color: '#aaa' }}>
							<p>
								{todos.filter(t => t.completed).length} of {todos.length} completed
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
