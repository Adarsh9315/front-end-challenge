import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='navbar navbar-dark'>
			<div className='container-fluid'>
				<span className='navbar-brand'>Movie App</span>
				<div className='nav-links'>
					<NavLink exact to='/' className='nav-link-item' activeClassName='nav-link-active'>
						Movies
					</NavLink>
					<NavLink to='/notes' className='nav-link-item' activeClassName='nav-link-active'>
						Notes
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
