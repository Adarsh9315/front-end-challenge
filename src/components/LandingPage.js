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
				<div className="landing-content">
					<h1 className="landing-title">
						🎬 Movie Showdown
					</h1>
					<p className="landing-subtitle">
						Discover, Search, and Nominate Your Favorite Movies
					</p>
					<div className="landing-features">
						<div className="feature-item">
							<span className="feature-icon">🔍</span>
							<h3>Search Movies</h3>
							<p>Browse through thousands of movies from the OMDB database</p>
						</div>
						<div className="feature-item">
							<span className="feature-icon">⭐</span>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 movies that deserve higher ratings</p>
						</div>
						<div className="feature-item">
							<span className="feature-icon">💾</span>
							<h3>Save Your Picks</h3>
							<p>Your nominations are saved locally and persist across sessions</p>
						</div>
					</div>
					<button className="get-started-btn" onClick={handleGetStarted}>
						Get Started
					</button>
					<div className="landing-footer">
						<p>Powered by OMDB API</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
