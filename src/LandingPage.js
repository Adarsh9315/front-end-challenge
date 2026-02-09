import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			{/* Hero Section */}
			<section className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">🎬 Movie Nomination App</h1>
					<p className="hero-subtitle">
						Discover, Search, and Nominate Your Favorite Movies
					</p>
					<p className="hero-description">
						Explore thousands of movies from the OMDB database and create your personalized list of top 5 nominations
					</p>
					<Link to="/app" className="cta-button">
						Get Started
					</Link>
				</div>
			</section>

			{/* Features Section */}
			<section className="features-section">
				<div className="container">
					<h2 className="features-title">Why Use Our App?</h2>
					<div className="features-grid">
						<div className="feature-card">
							<div className="feature-icon">🔍</div>
							<h3>Search Movies</h3>
							<p>Search through an extensive database of movies using the OMDB API</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">⭐</div>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 of your favorite movies to nominate for higher ratings</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">💾</div>
							<h3>Save Your Picks</h3>
							<p>Your nominations are automatically saved to your browser's local storage</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">🎯</div>
							<h3>Easy Management</h3>
							<p>Add and remove nominations with a simple, intuitive interface</p>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="how-it-works-section">
				<div className="container">
					<h2 className="section-title">How It Works</h2>
					<div className="steps-container">
						<div className="step">
							<div className="step-number">1</div>
							<h3>Search</h3>
							<p>Enter a movie title in the search box</p>
						</div>
						<div className="step">
							<div className="step-number">2</div>
							<h3>Browse</h3>
							<p>Browse through the search results</p>
						</div>
						<div className="step">
							<div className="step-number">3</div>
							<h3>Nominate</h3>
							<p>Click to add movies to your nominations list</p>
						</div>
						<div className="step">
							<div className="step-number">4</div>
							<h3>Manage</h3>
							<p>Review and manage your top 5 picks</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="cta-section">
				<div className="cta-content">
					<h2>Ready to Start Nominating?</h2>
					<p>Create your personalized movie nomination list today</p>
					<Link to="/app" className="cta-button-secondary">
						Launch App
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="landing-footer">
				<p>Powered by OMDB API | Movie Nomination App © 2024</p>
			</footer>
		</div>
	);
};

export default LandingPage;
