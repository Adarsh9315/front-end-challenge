import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className='landing-page'>
			<div className='landing-content'>
				<h1 className='landing-title'>Welcome to Movie Nominator</h1>
				<p className='landing-description'>
					Discover and nominate your favorite movies using our extensive movie database.
				</p>
				<div className='landing-features'>
					<div className='feature-card'>
						<h3>🔍 Search Movies</h3>
						<p>Browse through thousands of movies from the OMDB database</p>
					</div>
					<div className='feature-card'>
						<h3>⭐ Nominate Favorites</h3>
						<p>Select up to 5 movies you love and nominate them for higher ratings</p>
					</div>
					<div className='feature-card'>
						<h3>📝 Manage Nominations</h3>
						<p>Keep track of your nominations and modify them anytime</p>
					</div>
				</div>
				<button 
					className='landing-button'
					onClick={() => navigate('/app')}
				>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
