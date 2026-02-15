import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark'>
			<span className='navbar-brand mb-0 h1'>OMDB Movie App</span>
			<div className='navbar-nav-links'>
				<Link
					to='/'
					className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
				>
					Movies
				</Link>
				<Link
					to='/map'
					className={`nav-link-item ${location.pathname === '/map' ? 'active' : ''}`}
				>
					Map
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
