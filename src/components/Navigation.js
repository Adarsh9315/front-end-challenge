import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark bg-dark navigation-bar'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand'>
					Movie App
				</Link>
				<div className='navbar-nav flex-row'>
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
			</div>
		</nav>
	);
};

export default Navigation;
