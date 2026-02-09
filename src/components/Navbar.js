import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark' style={{ backgroundColor: '#1c1c1c' }}>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					OMDB App
				</Link>
				<div className='d-flex'>
					<Link
						className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
						to='/'
					>
						Movies
					</Link>
					<Link
						className={`nav-link-custom ${location.pathname === '/todos' ? 'active' : ''}`}
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
