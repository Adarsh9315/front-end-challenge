import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const handleToggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <div className='col'>
                    <h1>Todo List</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='input-group mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Add a new task'
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <div className='input-group-append'>
                            <button
                                className='btn btn-primary'
                                type='button'
                                onClick={handleAddTodo}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <ul className='list-group'>
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className={`list-group-item d-flex justify-content-between align-items-center ${
                                    todo.completed ? 'list-group-item-success' : ''
                                }`}
                            >
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleToggleTodo(todo.id)}
                                >
                                    {todo.text}
                                </span>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TodoPage;
