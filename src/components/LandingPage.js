import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="landing-header">
					<h1 className="landing-title">Movie Nominations</h1>
					<p className="landing-subtitle">Discover and Nominate Your Favorite Movies</p>
				</div>
				
				<div className="landing-description">
					<p className="description-text">
						Search through thousands of movies using the OMDB database. 
						Find your favorites and nominate up to 5 movies for higher ratings.
					</p>
				</div>

				<div className="landing-features">
					<div className="feature-item">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Search any movie from the extensive OMDB database</p>
					</div>
					<div className="feature-item">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Nominate up to 5 of your favorite movies</p>
					</div>
					<div className="feature-item">
						<div className="feature-icon">📋</div>
						<h3>Manage List</h3>
						<p>Add or remove nominations anytime</p>
					</div>
				</div>

				<button 
					className="btn btn-primary btn-get-started" 
					onClick={onGetStarted}
				>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
