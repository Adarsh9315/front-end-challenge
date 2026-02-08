import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className="navigation">
			<div className="nav-container">
				<div className="nav-brand">
					<h2>Movie App</h2>
				</div>
				<div className="nav-links">
					<Link 
						to="/" 
						className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
					>
						Movies
					</Link>
					<Link 
						to="/todos" 
						className={location.pathname === '/todos' ? 'nav-link active' : 'nav-link'}
					>
						Todos
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
