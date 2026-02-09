import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-container">
				<div className="landing-content">
					<h1 className="landing-title">
						🎬 Movie Nomination App
					</h1>
					<p className="landing-subtitle">
						Discover and nominate your favorite movies
					</p>
					<p className="landing-description">
						Search through thousands of movies and create your personal list of top 5 nominations. 
						Your selections are saved locally, so you can come back anytime to review or update your choices.
					</p>
					<div className="landing-features">
						<div className="feature">
							<span className="feature-icon">🔍</span>
							<h3>Search Movies</h3>
							<p>Browse through an extensive movie database</p>
						</div>
						<div className="feature">
							<span className="feature-icon">⭐</span>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 movies as your nominations</p>
						</div>
						<div className="feature">
							<span className="feature-icon">💾</span>
							<h3>Save Locally</h3>
							<p>Your nominations are saved in your browser</p>
						</div>
					</div>
					<Link to="/app" className="cta-button">
						Get Started
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
