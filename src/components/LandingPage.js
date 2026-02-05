import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	const history = useHistory();

	const handleGetStarted = () => {
		history.push('/app');
	};

	return (
		<div className='landing-page'>
			<div className='landing-container'>
				<div className='hero-section'>
					<h1 className='hero-title'>OMDB Movie Nominations</h1>
					<p className='hero-subtitle'>
						Discover, search, and nominate your favorite movies from the Open Movie Database
					</p>
					<button className='cta-button' onClick={handleGetStarted}>
						Get Started
					</button>
				</div>

				<div className='features-section'>
					<h2 className='features-title'>Features</h2>
					<div className='features-grid'>
						<div className='feature-card'>
							<div className='feature-icon'>🔍</div>
							<h3>Search Movies</h3>
							<p>Search through thousands of movies from the OMDB database</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>⭐</div>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 of your favorite movies for nomination</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>💾</div>
							<h3>Save Nominations</h3>
							<p>Your nominations are saved locally and persist across sessions</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>🎬</div>
							<h3>Movie Details</h3>
							<p>View detailed information about each movie including year and poster</p>
						</div>
					</div>
				</div>

				<div className='footer-section'>
					<p>Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
