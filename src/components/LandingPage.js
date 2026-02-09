import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="landing-header">
					<h1 className="landing-title">🎬 Movie Nomination App</h1>
					<p className="landing-subtitle">Discover and nominate your favorite movies</p>
				</div>
				
				<div className="landing-features">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Search through thousands of movies from the OMDB database</p>
					</div>
					
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 of your favorite movies for nomination</p>
					</div>
					
					<div className="feature-card">
						<div className="feature-icon">📋</div>
						<h3>Manage Nominations</h3>
						<p>View and manage your nominated movies anytime</p>
					</div>
				</div>
				
				<button className="get-started-btn" onClick={onGetStarted}>
					Get Started
				</button>
				
				<div className="landing-footer">
					<p>Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
