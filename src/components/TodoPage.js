import React, { useState, useEffect } from 'react';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const saveTodos = (newTodos) => {
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            const newTodos = [...todos, { id: Date.now(), text: inputValue, completed: false }];
            setTodos(newTodos);
            saveTodos(newTodos);
            setInputValue('');
        }
    };

    const handleToggleTodo = (id) => {
        const newTodos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
        saveTodos(newTodos);
    };

    const handleDeleteTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        saveTodos(newTodos);
    };

    return (
        <div className='container-fluid'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <div className='col'>
                    <h1>Todo List</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Add a new todo..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={handleAddTodo}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <ul className="list-group">
                        {todos.map(todo => (
                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span 
                                    style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                                    onClick={() => handleToggleTodo(todo.id)}
                                >
                                    {todo.text}
                                </span>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoPage;
