import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className='navigation'>
			<div className='container-fluid'>
				<div className='row align-items-center py-3'>
					<div className='col-md-6 col-12'>
						<h2 className='app-title mb-0'>
							<Link to='/' className='brand-link'>
								Movie Nominations
							</Link>
						</h2>
					</div>
					<div className='col-md-6 col-12'>
						<ul className='nav-links'>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/about'>About Us</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
