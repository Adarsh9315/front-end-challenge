import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Movie App
        </Link>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link 
              to="/todo" 
              className={`nav-link ${location.pathname === '/todo' ? 'active' : ''}`}
            >
              Todo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
