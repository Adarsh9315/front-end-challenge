import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className='landing-page'>
			<div className='landing-content'>
				<div className='hero-section'>
					<h1 className='app-title'>🎬 Movie Nomination App</h1>
					<p className='app-subtitle'>Discover and nominate your favorite movies</p>
					<div className='feature-list'>
						<div className='feature-item'>
							<span className='feature-icon'>🔍</span>
							<h3>Search Movies</h3>
							<p>Browse through thousands of movies from the OMDB database</p>
						</div>
						<div className='feature-item'>
							<span className='feature-icon'>⭐</span>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 movies to nominate for higher ratings</p>
						</div>
						<div className='feature-item'>
							<span className='feature-icon'>💾</span>
							<h3>Save Your Picks</h3>
							<p>Your nominations are saved locally and persist across sessions</p>
						</div>
					</div>
					<button className='get-started-btn' onClick={onGetStarted}>
						Get Started
					</button>
				</div>
				<div className='landing-footer'>
					<p>Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
