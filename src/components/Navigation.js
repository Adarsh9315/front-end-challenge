import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className='navigation'>
			<div className='container'>
				<div className='nav-content'>
					<div className='nav-brand'>
						<h2>The Shoppies</h2>
					</div>
					<div className='nav-links'>
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
			</div>
		</nav>
	);
};

export default Navigation;
