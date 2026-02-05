import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="hero-section">
					<h1 className="hero-title">OMDB Movie Nominations</h1>
					<p className="hero-subtitle">
						Discover and nominate your favorite movies from the Open Movie Database
					</p>
					<div className="hero-description">
						<p>Search through thousands of movies and create your personal list of up to 5 nominations.</p>
					</div>
				</div>

				<div className="features-section">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Explore a vast collection of movies from the OMDB database</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies that deserve recognition</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">💾</div>
						<h3>Save Your List</h3>
						<p>Your nominations are automatically saved locally</p>
					</div>
				</div>

				<div className="cta-section">
					<Link to="/app" className="cta-button">
						Get Started
					</Link>
				</div>

				<div className="footer-section">
					<p>Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
