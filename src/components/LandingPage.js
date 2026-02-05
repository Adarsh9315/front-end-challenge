import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className="landing-page">
			<div className="landing-hero">
				<div className="landing-content">
					<div className="landing-icon">
						<span role="img" aria-label="movie">🎬</span>
					</div>
					<h1 className="landing-title">Movie Nominations</h1>
					<p className="landing-subtitle">
						Discover, Search, and Nominate Your Favorite Films
					</p>
					<p className="landing-description">
						Explore the Open Movie Database and nominate up to 5 of your favorite 
						movies. Share your picks and celebrate the films that matter most to you.
					</p>
					
					<div className="landing-features">
						<div className="feature-card">
							<div className="feature-icon">🔍</div>
							<h3>Search Movies</h3>
							<p>Browse through thousands of movies from the OMDB database</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">⭐</div>
							<h3>Nominate Favorites</h3>
							<p>Choose up to 5 movies that deserve recognition</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">📋</div>
							<h3>Manage List</h3>
							<p>Easily add or remove nominations anytime</p>
						</div>
					</div>

					<button className="landing-cta" onClick={onGetStarted}>
						Get Started
						<span className="cta-arrow">→</span>
					</button>

					<p className="landing-note">
						Powered by OMDB API • No sign-up required
					</p>
				</div>
			</div>

			<div className="landing-footer">
				<p>© 2026 Movie Nominations App</p>
			</div>
		</div>
	);
};

export default LandingPage;
