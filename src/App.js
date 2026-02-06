import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ChessGame from './components/ChessGame';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Movie App</Link>
            <div className="navbar-nav flex-row">
                <Link className="nav-link pr-3" to="/">Home</Link>
                <Link className="nav-link" to="/chess">Chess Game</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chess" element={<ChessGame />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
