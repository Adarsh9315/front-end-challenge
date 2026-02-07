import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviePage from './components/MoviePage';
import TodoPage from './components/TodoPage';

const App = () => {
    return (
        <BrowserRouter>
            <div className='container-fluid movie-app-nav'>
                <div className='row d-flex align-items-center mt-4 mb-4'>
                    <div className='col'>
                        <nav className="d-flex">
                            <Link to="/" className="mr-4 text-white" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>Movies</Link>
                            <Link to="/todo" className="text-white" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>Todo</Link>
                        </nav>
                    </div>
                </div>
            </div>
            
            <Routes>
                <Route path="/" element={<MoviePage />} />
                <Route path="/todo" element={<TodoPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
