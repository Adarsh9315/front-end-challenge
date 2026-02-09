import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onEnterApp }) => {
	return (
		<div className='landing-page'>
			<div className='landing-content'>
				<div className='hero-section'>
					<h1 className='app-title'>Movie Nomination App</h1>
					<p className='app-subtitle'>Discover and nominate your favorite movies</p>
				</div>

				<div className='features-section'>
					<h2 className='features-title'>Features</h2>
					<div className='features-grid'>
						<div className='feature-card'>
							<div className='feature-icon'>🔍</div>
							<h3>Search Movies</h3>
							<p>Search through thousands of movies using the OMDB database</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>⭐</div>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 movies to nominate for higher ratings</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>💾</div>
							<h3>Save Nominations</h3>
							<p>Your nominations are saved locally and persist across sessions</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>🗑️</div>
							<h3>Manage List</h3>
							<p>Easily add or remove movies from your nomination list</p>
						</div>
					</div>
				</div>

				<div className='cta-section'>
					<button className='cta-button' onClick={onEnterApp}>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
