import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className='navigation'>
			<div className='container-fluid'>
				<div className='nav-links'>
					<Link to='/' className='nav-link'>
						Movies
					</Link>
					<Link to='/notes' className='nav-link'>
						Notes
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
