import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark app-navbar'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					Movie App
				</Link>
				<div className='nav-links'>
					<Link
						className={
							'nav-link-item' +
							(location.pathname === '/' ? ' nav-link-active' : '')
						}
						to='/'
					>
						Movies
					</Link>
					<Link
						className={
							'nav-link-item' +
							(location.pathname === '/todos' ? ' nav-link-active' : '')
						}
						to='/todos'
					>
						Todos
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
