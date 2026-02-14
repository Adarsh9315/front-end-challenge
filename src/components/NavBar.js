import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
	const location = useLocation();

	return (
		<nav className="app-navbar">
			<div className="navbar-brand">MovieApp</div>
			<div className="navbar-links">
				<Link
					to="/"
					className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
				>
					Movies
				</Link>
				<Link
					to="/chess"
					className={`nav-link ${location.pathname === '/chess' ? 'active' : ''}`}
				>
					Chess
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
