import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark' style={{ backgroundColor: '#141414', padding: '15px 30px' }}>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
					Movie App
				</Link>
				<div className='navbar-nav flex-row'>
					<Link
						to='/'
						className={`nav-link mr-3 ${location.pathname === '/' ? 'active' : ''}`}
						style={{
							color: location.pathname === '/' ? '#e50914' : '#ffffff',
							textDecoration: 'none',
							fontWeight: location.pathname === '/' ? 'bold' : 'normal'
						}}
					>
						Movies
					</Link>
					<Link
						to='/todos'
						className={`nav-link ${location.pathname === '/todos' ? 'active' : ''}`}
						style={{
							color: location.pathname === '/todos' ? '#e50914' : '#ffffff',
							textDecoration: 'none',
							fontWeight: location.pathname === '/todos' ? 'bold' : 'normal'
						}}
					>
						Todos
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
