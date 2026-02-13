import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className='navigation'>
			<div className='navigation__container'>
				<div className='navigation__brand'>
					<span className='navigation__logo'>🎬</span>
					<span className='navigation__title'>The Shoppies</span>
				</div>
				<div className='navigation__links'>
					<Link to='/' className='navigation__link'>
						Movies
					</Link>
					<Link to='/todos' className='navigation__link'>
						Todos
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
