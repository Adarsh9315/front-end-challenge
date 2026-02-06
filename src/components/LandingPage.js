import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="landing-header">
					<h1 className="landing-title">OMDB Movie Nominations</h1>
					<p className="landing-subtitle">
						Discover and nominate your favorite movies
					</p>
				</div>

				<div className="landing-features">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Browse through thousands of movies from the OMDB database</p>
					</div>

					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies to add to your personal nomination list</p>
					</div>

					<div className="feature-card">
						<div className="feature-icon">💾</div>
						<h3>Save Locally</h3>
						<p>Your nominations are saved in your browser for easy access</p>
					</div>
				</div>

				<div className="landing-cta">
					<Link to="/app" className="cta-button">
						Get Started
					</Link>
				</div>

				<div className="landing-footer">
					<p>Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
