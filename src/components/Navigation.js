import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
	return (
		<div className='navigation mb-4'>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className='container-fluid'>
					<a className='navbar-brand' href='#'>App Suite</a>
					<div className='navbar-nav'>
						<button 
							className={`nav-link btn ${currentPage === 'movies' ? 'btn-primary' : 'btn-outline-primary'}`}
							onClick={() => setCurrentPage('movies')}
						>
							Movie Nominations
						</button>
						<button 
							className={`nav-link btn ml-2 ${currentPage === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
							onClick={() => setCurrentPage('todos')}
						>
							Todo List
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navigation;