import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark app-navbar'>
			<div className='container-fluid d-flex align-items-center'>
				<span className='navbar-brand mb-0 h1'>Movie App</span>
				<div className='nav-links'>
					<Link
						to='/'
						className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
					>
						Movies
					</Link>
					<Link
						to='/todos'
						className={`nav-link-item ${location.pathname === '/todos' ? 'active' : ''}`}
					>
						Todos
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
