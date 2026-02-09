import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="hero-section">
					<h1 className="hero-title">
						<span className="title-main">Movie Nomination</span>
						<span className="title-sub">Platform</span>
					</h1>
					<p className="hero-description">
						Discover, search, and nominate your favorite movies from the extensive OMDB database.
						Create your personalized list of top 5 movie nominations.
					</p>
					<button className="cta-button" onClick={onGetStarted}>
						Get Started
						<span className="arrow">→</span>
					</button>
				</div>

				<div className="features-section">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Access thousands of movies from the OMDB database with instant search</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies that deserve recognition and higher ratings</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">💾</div>
						<h3>Save Your Picks</h3>
						<p>Your nominations are automatically saved and persist across sessions</p>
					</div>
				</div>

				<div className="info-section">
					<h2>How It Works</h2>
					<div className="steps">
						<div className="step">
							<div className="step-number">1</div>
							<div className="step-content">
								<h4>Search</h4>
								<p>Type any movie title in the search box</p>
							</div>
						</div>
						<div className="step">
							<div className="step-number">2</div>
							<div className="step-content">
								<h4>Nominate</h4>
								<p>Click the "Nominate" button on your favorite movies</p>
							</div>
						</div>
						<div className="step">
							<div className="step-number">3</div>
							<div className="step-content">
								<h4>Manage</h4>
								<p>View and remove nominations from your list anytime</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
