import React, { useState, useEffect } from 'react';
import './TodoPage.css';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  const saveToLocalStorage = (items) => {
    localStorage.setItem('todos', JSON.stringify(items));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
    setInputValue('');
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

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="todo-add-btn">
          Add
        </button>
      </form>

      <div className="todo-stats">
        <span>{remainingCount} remaining</span>
        <span>{completedCount} completed</span>
        {completedCount > 0 && (
          <button onClick={clearCompleted} className="clear-btn">
            Clear Completed
          </button>
        )}
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="todo-empty">No todos yet. Add one above!</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="todo-delete-btn"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoPage;
