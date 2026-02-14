import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark navbar-custom'>
			<div className='container-fluid'>
				<span className='navbar-brand'>Movie App</span>
				<div className='nav-links'>
					<Link
						to='/'
						className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
					>
						Movies
					</Link>
					<Link
						to='/notes'
						className={`nav-link-item ${location.pathname === '/notes' ? 'active' : ''}`}
					>
						Notes
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
