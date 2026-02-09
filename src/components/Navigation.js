import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className='navbar navbar-dark bg-dark mb-4' style={{ backgroundColor: '#141414 !important' }}>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand'>
					Movie App
				</Link>
				<div className='navbar-nav d-flex flex-row'>
					<Link
						to='/'
						className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
						style={{
							color: location.pathname === '/' ? '#fff' : '#888',
							textDecoration: 'none',
							fontWeight: location.pathname === '/' ? 'bold' : 'normal',
							marginRight: '20px'
						}}
					>
						Movies
					</Link>
					<Link
						to='/todo'
						className={`nav-link ${location.pathname === '/todo' ? 'active' : ''}`}
						style={{
							color: location.pathname === '/todo' ? '#fff' : '#888',
							textDecoration: 'none',
							fontWeight: location.pathname === '/todo' ? 'bold' : 'normal'
						}}
					>
						Todo
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
