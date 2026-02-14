import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark bg-dark'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand'>
					Movie App
				</Link>
				<div className='navbar-nav flex-row'>
					<Link
						to='/'
						className={`nav-link mr-3 ${location.pathname === '/' ? 'active' : ''}`}
					>
						Movies
					</Link>
					<Link
						to='/notes'
						className={`nav-link ${location.pathname === '/notes' ? 'active' : ''}`}
					>
						Notes
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
