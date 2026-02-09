import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onEnter }) => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="landing-header">
					<h1 className="landing-title">OMDB Movie Nominations</h1>
					<p className="landing-subtitle">Search, discover, and nominate your favorite movies</p>
				</div>

				<div className="landing-features">
					<div className="feature-item">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Explore millions of movies from the Open Movie Database</p>
					</div>

					<div className="feature-item">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies to nominate for higher ratings</p>
					</div>

					<div className="feature-item">
						<div className="feature-icon">💾</div>
						<h3>Save Your Picks</h3>
						<p>Your nominations are automatically saved locally</p>
					</div>
				</div>

				<button className="landing-button" onClick={onEnter}>
					Get Started
				</button>

				<div className="landing-footer">
					<p>Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
