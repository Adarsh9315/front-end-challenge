import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="hero-section">
					<h1 className="hero-title">Welcome to Movie Nominator</h1>
					<p className="hero-subtitle">
						Discover, search, and nominate your favorite movies
					</p>
					<p className="hero-description">
						Powered by the Open Movie Database (OMDB), this app lets you explore 
						thousands of movies and create your personal list of top 5 nominations.
					</p>
				</div>

				<div className="features-section">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Search through thousands of movies from the OMDB database</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies as your personal nominations</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">💾</div>
						<h3>Save Locally</h3>
						<p>Your nominations are saved locally in your browser</p>
					</div>
				</div>

				<div className="cta-section">
					<Link to="/movies" className="cta-button primary">
						Start Exploring Movies
					</Link>
					<Link to="/chess" className="cta-button secondary">
						Play Chess
					</Link>
				</div>

				<div className="info-section">
					<h2>How It Works</h2>
					<ol className="steps-list">
						<li>Search for any movie using the search bar</li>
						<li>Browse through the results and find your favorites</li>
						<li>Click "Nominate" to add movies to your list (max 5)</li>
						<li>Manage your nominations - add or remove as you like</li>
					</ol>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
