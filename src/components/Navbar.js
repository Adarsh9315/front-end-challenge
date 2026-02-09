import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar-container'>
			<Link
				to='/'
				className={`navbar-link ${location.pathname === '/' ? 'navbar-link-active' : ''}`}
			>
				Movies
			</Link>
			<Link
				to='/todo'
				className={`navbar-link ${location.pathname === '/todo' ? 'navbar-link-active' : ''}`}
			>
				Todo
			</Link>
		</nav>
	);
};

export default Navbar;
