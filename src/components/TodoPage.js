import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [openSnackbar] = useSnackbar();

	useEffect(() => {
		try {
			const stored = localStorage.getItem('todos');
			if (!stored) return;
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				setTodos(parsed);
			}
		} catch (error) {
			console.error('Failed to parse todos from storage', error);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('todos', JSON.stringify(items));
	};

	const addTodo = (text) => {
		if (!text.trim()) {
			openSnackbar('Todo text cannot be empty');
			return;
		}

		const newTodo = {
			id: Date.now().toString(),
			text: text.trim(),
			completed: false,
			createdAt: new Date().toISOString()
		};

		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		openSnackbar('Todo added successfully');
	};

	const toggleTodo = (id) => {
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		openSnackbar('Todo deleted');
	};

	const editTodo = (id, newText) => {
		if (!newText.trim()) {
			openSnackbar('Todo text cannot be empty');
			return;
		}

		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, text: newText.trim() } : todo
		);
		setTodos(newTodos);
		saveToLocalStorage(newTodos);
		openSnackbar('Todo updated');
	};

	const completedCount = todos.filter((todo) => todo.completed).length;
	const totalCount = todos.length;

	return (
		<div className='todo-page'>
			<div className='todo-container'>
				<div className='todo-header'>
					<h1>My Todos</h1>
					<p className='todo-stats'>
						{completedCount} of {totalCount} completed
					</p>
				</div>

				<AddTodo onAdd={addTodo} />

				<div className='todo-list'>
					{todos.length === 0 ? (
						<div className='todo-empty'>
							<p>No todos yet. Add one to get started!</p>
						</div>
					) : (
						todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								onToggle={toggleTodo}
								onDelete={deleteTodo}
								onEdit={editTodo}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoPage;
