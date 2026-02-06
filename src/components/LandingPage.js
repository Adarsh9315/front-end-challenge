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
			<div className="landing-container">
				<div className="hero-section">
					<h1 className="hero-title">
						<span className="hero-emoji">🎬</span>
						Movie Nomination App
					</h1>
					<p className="hero-subtitle">
						Discover, search, and nominate your favorite movies
					</p>
					<button className="cta-button" onClick={handleGetStarted}>
						Get Started
					</button>
				</div>

				<div className="features-section">
					<h2 className="features-title">Features</h2>
					<div className="features-grid">
						<div className="feature-card">
							<div className="feature-icon">🔍</div>
							<h3>Search Movies</h3>
							<p>Search through thousands of movies using the OMDB database</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">⭐</div>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 movies as your all-time favorites</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">💾</div>
							<h3>Save Nominations</h3>
							<p>Your nominations are saved locally and persist across sessions</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">🎯</div>
							<h3>Easy Management</h3>
							<p>Add or remove nominations with a single click</p>
						</div>
					</div>
				</div>

				<div className="footer-section">
					<p>Powered by <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDB API</a></p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
