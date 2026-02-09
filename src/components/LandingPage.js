import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onEnterApp }) => {
	return (
		<div className='landing-page'>
			<div className='landing-content'>
				<div className='landing-header'>
					<h1 className='landing-title'>Movie Nominations</h1>
					<p className='landing-subtitle'>Discover and Nominate Your Favorite Movies</p>
				</div>
				
				<div className='landing-features'>
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
						<div className='feature-icon'>🎬</div>
						<h3>Manage Nominations</h3>
						<p>Add or remove nominations as you discover new favorites</p>
					</div>
				</div>

				<button className='enter-app-btn' onClick={onEnterApp}>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
