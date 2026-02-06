import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesPage from './components/MoviesPage';
import TodoPage from './components/TodoPage';

const App = () => {
    return (
        <Router>
            <div className='container-fluid movie-app'>
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-4'>
                    <Link className='navbar-brand' to='/'>
                        Movie App
                    </Link>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/'>
                                    Movies
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/todo'>
                                    Todo
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Routes>
                    <Route path='/' element={<MoviesPage />} />
                    <Route path='/todo' element={<TodoPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
