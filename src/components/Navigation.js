import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className='navigation'>
			<div className='nav-container'>
				<Link to='/' className='nav-link'>
					Movies
				</Link>
				<Link to='/todos' className='nav-link'>
					Todos
				</Link>
			</div>
		</nav>
	);
};

export default Navigation;
