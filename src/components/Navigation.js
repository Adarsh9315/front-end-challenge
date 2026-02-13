import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className='main-nav'>
			<div className='nav-container'>
				<Link to='/' className='nav-logo'>
					The Shoppies 2.0
				</Link>
				<div className='nav-links'>
					<Link
						to='/'
						className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
					>
						Home
					</Link>
					<Link
						to='/todo'
						className={`nav-link ${location.pathname === '/todo' ? 'active' : ''}`}
					>
						Todo
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
