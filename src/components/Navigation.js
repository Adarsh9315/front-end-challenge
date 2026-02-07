import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
    return (
        <nav className="app-navigation">
            <div className="nav-brand">Movie App</div>
            <div className="nav-links">
                <button
                    className={`nav-link ${currentPage === 'movies' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('movies')}
                >
                    Movies
                </button>
                <button
                    className={`nav-link ${currentPage === 'notes' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('notes')}
                >
                    Notes
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
