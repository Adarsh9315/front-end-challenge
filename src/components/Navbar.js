import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark app-navbar'>
			<Link className='navbar-brand' to='/'>
				Movie App
			</Link>
			<div className='nav-links'>
				<Link
					className={`nav-link-item ${
						location.pathname === '/' ? 'active' : ''
					}`}
					to='/'
				>
					Movies
				</Link>
				<Link
					className={`nav-link-item ${
						location.pathname === '/todos' ? 'active' : ''
					}`}
					to='/todos'
				>
					Todos
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
