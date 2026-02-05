import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onEnterApp }) => {
	return (
		<div className="landing-page">
			<div className="landing-hero">
				<div className="hero-content">
					<h1 className="hero-title">
						<span className="title-icon">🎬</span>
						Movie Nominations
					</h1>
					<p className="hero-subtitle">
						Discover, search, and nominate your favorite movies for the ultimate awards experience
					</p>
					<button className="cta-button" onClick={onEnterApp}>
						Start Nominating
						<span className="button-arrow">→</span>
					</button>
				</div>
			</div>

			<div className="features-section">
				<h2 className="features-title">How It Works</h2>
				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Browse through thousands of movies from the OMDB database. Find your favorites with our powerful search.</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies you believe deserve recognition. Your nominations matter!</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">📋</div>
						<h3>Manage Nominations</h3>
						<p>Review and modify your nominations anytime. Your choices are saved automatically.</p>
					</div>
				</div>
			</div>

			<div className="stats-section">
				<div className="stat-item">
					<span className="stat-number">5</span>
					<span className="stat-label">Max Nominations</span>
				</div>
				<div className="stat-item">
					<span className="stat-number">∞</span>
					<span className="stat-label">Movies to Explore</span>
				</div>
				<div className="stat-item">
					<span className="stat-number">100%</span>
					<span className="stat-label">Free to Use</span>
				</div>
			</div>

			<div className="cta-section">
				<h2>Ready to Make Your Voice Heard?</h2>
				<p>Join now and nominate the movies that moved you</p>
				<button className="cta-button secondary" onClick={onEnterApp}>
					Get Started
					<span className="button-arrow">→</span>
				</button>
			</div>

			<footer className="landing-footer">
				<p>Powered by OMDB API • Made with ❤️ for movie lovers</p>
			</footer>
		</div>
	);
};

export default LandingPage;
