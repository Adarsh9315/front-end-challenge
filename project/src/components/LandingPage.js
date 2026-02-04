import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<div className='landing-page'>
			<div className='landing-hero'>
				<h1 className='landing-title'>Movie Nomination App</h1>
				<p className='landing-subtitle'>
					Discover, search, and nominate your favorite movies from the OMDB database
				</p>
				<div className='landing-features'>
					<div className='feature'>
						<h3>🔍 Search Movies</h3>
						<p>Search through thousands of movies using the OMDB API</p>
					</div>
					<div className='feature'>
						<h3>⭐ Nominate Favorites</h3>
						<p>Select up to 5 of your favorite movies for nomination</p>
					</div>
					<div className='feature'>
						<h3>💾 Save Nominations</h3>
						<p>Your nominations are saved locally and persist across sessions</p>
					</div>
				</div>
				<Link to='/app' className='btn btn-primary btn-lg landing-cta'>
					Get Started
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
