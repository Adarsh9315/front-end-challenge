import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-4'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					Movie App
				</Link>
				<div className='navbar-nav'>
					<Link className='nav-link' to='/'>
						Movies
					</Link>
					<Link className='nav-link' to='/todos'>
						Todos
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
