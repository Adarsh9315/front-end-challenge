import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark mb-3' style={{ backgroundColor: '#1c1c1c' }}>
			<div className='container-fluid'>
				<span className='navbar-brand mb-0 h1'>Movie App</span>
				<div className='d-flex'>
					<Link
						to='/'
						className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
					>
						Movies
					</Link>
					<Link
						to='/todos'
						className={`nav-link-custom ${location.pathname === '/todos' ? 'active' : ''}`}
					>
						Todos
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
