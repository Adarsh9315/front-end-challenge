import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
	const location = useLocation();

	return (
		<nav
			className='navbar navbar-expand-lg navbar-dark'
			style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}
		>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					OMDB App
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item'>
							<Link
								className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
								to='/'
							>
								Movies
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className={`nav-link ${location.pathname === '/todos' ? 'active' : ''}`}
								to='/todos'
							>
								Todos
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
