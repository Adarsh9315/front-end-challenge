import React, { useState, useEffect } from 'react';
import '../Todo.css';

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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="todo-add-btn">Add</button>
      </form>

      <div className="todo-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="todo-empty">No todos to display</li>
        ) : (
          filteredTodos.map(todo => (
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

      <div className="todo-footer">
        <span className="todo-count">{activeTodosCount} items left</span>
        {todos.some(todo => todo.completed) && (
          <button onClick={clearCompleted} className="clear-completed-btn">
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
