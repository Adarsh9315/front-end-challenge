import React, { useState, useEffect } from 'react';
import '../TodoPage.css';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [filter, setFilter] = useState('all');

    // Load todos from localStorage on mount
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const startEditing = (id, text) => {
        setEditingId(id);
        setEditValue(text);
    };

    const saveEdit = (id) => {
        if (editValue.trim() === '') return;
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: editValue.trim() } : todo
        ));
        setEditingId(null);
        setEditValue('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue('');
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const activeTodosCount = todos.filter(todo => !todo.completed).length;
    const completedTodosCount = todos.filter(todo => todo.completed).length;

    return (
        <div className="todo-container">
            <h1 className="todo-title">Todo List</h1>
            
            <form onSubmit={addTodo} className="todo-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What needs to be done?"
                    className="todo-input"
                />
                <button type="submit" className="todo-add-btn">
                    Add Todo
                </button>
            </form>

            <div className="todo-filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All ({todos.length})
                </button>
                <button
                    className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Active ({activeTodosCount})
                </button>
                <button
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed ({completedTodosCount})
                </button>
            </div>

            <ul className="todo-list">
                {filteredTodos.length === 0 ? (
                    <li className="todo-empty">
                        {filter === 'all' 
                            ? 'No todos yet. Add one above!' 
                            : `No ${filter} todos.`}
                    </li>
                ) : (
                    filteredTodos.map(todo => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            {editingId === todo.id ? (
                                <div className="todo-edit-container">
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="todo-edit-input"
                                        autoFocus
                                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                                    />
                                    <button 
                                        onClick={() => saveEdit(todo.id)} 
                                        className="todo-btn save-btn"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={cancelEdit} 
                                        className="todo-btn cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="todo-content">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => toggleComplete(todo.id)}
                                            className="todo-checkbox"
                                        />
                                        <span className="todo-text">{todo.text}</span>
                                    </div>
                                    <div className="todo-actions">
                                        <button
                                            onClick={() => startEditing(todo.id, todo.text)}
                                            className="todo-btn edit-btn"
                                            disabled={todo.completed}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="todo-btn delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                )}
            </ul>

            {completedTodosCount > 0 && (
                <button onClick={clearCompleted} className="clear-completed-btn">
                    Clear Completed ({completedTodosCount})
                </button>
            )}
        </div>
    );
};

export default TodoPage;
