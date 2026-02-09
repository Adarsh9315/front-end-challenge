import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="landing-header">
					<h1 className="landing-title">The Shoppies</h1>
					<p className="landing-subtitle">Movie Awards for Entrepreneurs</p>
				</div>
				<div className="landing-description">
					<p className="description-text">
						Search and nominate your favorite movies for The Shoppies awards.
						Find movies using the OMDB database and build your list of top 5 nominations.
					</p>
				</div>
				<div className="landing-features">
					<div className="feature-item">
						<span className="feature-icon">🔍</span>
						<p>Search Movies</p>
					</div>
					<div className="feature-item">
						<span className="feature-icon">⭐</span>
						<p>Nominate Favorites</p>
					</div>
					<div className="feature-item">
						<span className="feature-icon">📋</span>
						<p>Build Your Top 5</p>
					</div>
				</div>
				<button className="get-started-btn" onClick={onGetStarted}>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
