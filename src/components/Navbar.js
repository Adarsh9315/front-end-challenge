import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar-custom'>
			<Link to='/' className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}>
				Movies
			</Link>
			<Link to='/notes' className={`nav-link-custom ${location.pathname === '/notes' ? 'active' : ''}`}>
				Notes
			</Link>
		</nav>
	);
};

export default Navbar;
