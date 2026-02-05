import React from 'react';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className="landing-page">
			<div className="landing-hero">
				<div className="hero-content">
					<h1 className="hero-title">
						<span className="hero-icon">🎬</span>
						Movie Nominations
					</h1>
					<p className="hero-subtitle">
						Discover, search, and nominate your favorite movies for the ultimate awards experience
					</p>
					<button className="cta-button" onClick={onGetStarted}>
						Get Started
						<span className="cta-arrow">→</span>
					</button>
				</div>
			</div>

			<div className="features-section">
				<h2 className="features-title">How It Works</h2>
				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Browse through thousands of movies from the OMDB database</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies you think deserve recognition</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">📋</div>
						<h3>Manage List</h3>
						<p>Easily add or remove nominations from your curated list</p>
					</div>
				</div>
			</div>

			<div className="stats-section">
				<div className="stat-item">
					<div className="stat-number">5</div>
					<div className="stat-label">Max Nominations</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">∞</div>
					<div className="stat-label">Movies to Explore</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">💾</div>
					<div className="stat-label">Auto-Saved</div>
				</div>
			</div>

			<footer className="landing-footer">
				<p>Powered by OMDB API • Built with React</p>
			</footer>
		</div>
	);
};

export default LandingPage;
