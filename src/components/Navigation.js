import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className='navigation'>
			<div className='nav-container'>
				<Link
					to='/'
					className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
				>
					Movies
				</Link>
				<Link
					to='/todos'
					className={`nav-link ${location.pathname === '/todos' ? 'active' : ''}`}
				>
					Todos
				</Link>
			</div>
		</nav>
	);
};

export default Navigation;
