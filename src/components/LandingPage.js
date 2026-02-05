import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className="landing-page">
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">
						<span className="title-icon">🎬</span>
						Movie Nominations
					</h1>
					<p className="hero-subtitle">
						Discover, search, and nominate your favorite movies for the awards
					</p>
					<button className="cta-button" onClick={onGetStarted}>
						Get Started
					</button>
				</div>
			</div>

			<div className="features-section">
				<h2 className="features-heading">How It Works</h2>
				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>
							Browse through millions of movies using our powerful search powered by OMDB
						</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>
							Select up to 5 of your favorite movies to nominate for the awards
						</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">💾</div>
						<h3>Save Your Picks</h3>
						<p>
							Your nominations are automatically saved and ready when you return
						</p>
					</div>
				</div>
			</div>

			<div className="cta-section">
				<h2>Ready to nominate your favorites?</h2>
				<button className="cta-button secondary" onClick={onGetStarted}>
					Start Nominating
				</button>
			</div>

			<footer className="landing-footer">
				<p>Powered by OMDB API</p>
			</footer>
		</div>
	);
};

export default LandingPage;
