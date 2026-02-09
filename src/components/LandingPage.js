import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onEnter }) => {
	return (
		<div className='landing-page'>
			<div className='landing-content'>
				<div className='landing-header'>
					<h1 className='landing-title'>Movie Nomination App</h1>
					<p className='landing-subtitle'>Discover and Nominate Your Favorite Movies</p>
				</div>

				<div className='landing-features'>
					<div className='feature-card'>
						<div className='feature-icon'>🔍</div>
						<h3>Search Movies</h3>
						<p>Browse through thousands of movies using the OMDB database</p>
					</div>

					<div className='feature-card'>
						<div className='feature-icon'>⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies you'd like to nominate for higher ratings</p>
					</div>

					<div className='feature-card'>
						<div className='feature-icon'>💾</div>
						<h3>Save Your Picks</h3>
						<p>Your nominations are saved locally and persist across sessions</p>
					</div>
				</div>

				<button className='landing-button' onClick={onEnter}>
					Get Started
				</button>

				<div className='landing-footer'>
					<p>Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
