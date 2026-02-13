import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	const history = useHistory();

	const handleGetStarted = () => {
		history.push('/app');
	};

	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="landing-header">
					<h1 className="landing-title">Movie Showdown</h1>
					<p className="landing-subtitle">Discover, Search, and Nominate Your Favorite Movies</p>
				</div>
				
				<div className="landing-features">
					<div className="feature-card">
						<div className="feature-icon">🎬</div>
						<h3>Search Movies</h3>
						<p>Search through thousands of movies using the OMDB database</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 of your favorite movies to nominate</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🎯</div>
						<h3>Easy Management</h3>
						<p>Add or remove nominations with a simple click</p>
					</div>
				</div>

				<button className="get-started-btn" onClick={handleGetStarted}>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
