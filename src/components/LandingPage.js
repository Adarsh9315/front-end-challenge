import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<nav className="landing-nav">
				<div className="nav-brand">
					<span className="brand-icon">🎬</span>
					<span className="brand-text">MovieNominate</span>
				</div>
				<Link to="/app" className="nav-cta">
					Get Started
				</Link>
			</nav>

			<section className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">
						Discover & Nominate
						<span className="highlight"> Your Favorite Movies</span>
					</h1>
					<p className="hero-description">
						Search through thousands of movies, discover hidden gems, and nominate 
						your top 5 favorites. Join movie enthusiasts in celebrating the best of cinema.
					</p>
					<div className="hero-cta">
						<Link to="/app" className="btn-primary">
							Start Nominating
						</Link>
						<a href="#features" className="btn-secondary">
							Learn More
						</a>
					</div>
					<div className="hero-stats">
						<div className="stat">
							<span className="stat-number">1M+</span>
							<span className="stat-label">Movies</span>
						</div>
						<div className="stat">
							<span className="stat-number">5</span>
							<span className="stat-label">Nominations</span>
						</div>
						<div className="stat">
							<span className="stat-number">Free</span>
							<span className="stat-label">Forever</span>
						</div>
					</div>
				</div>
				<div className="hero-visual">
					<div className="movie-cards-stack">
						<div className="movie-card card-1">
							<div className="card-poster"></div>
						</div>
						<div className="movie-card card-2">
							<div className="card-poster"></div>
						</div>
						<div className="movie-card card-3">
							<div className="card-poster"></div>
						</div>
					</div>
				</div>
			</section>

			<section id="features" className="features-section">
				<h2 className="section-title">How It Works</h2>
				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Browse through an extensive database of movies from all genres and eras using the OMDB API.</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Found a movie you love? Add it to your nomination list with a single click.</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🏆</div>
						<h3>Curate Top 5</h3>
						<p>Select your top 5 movies of all time. Remove and add as you discover new favorites.</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">💾</div>
						<h3>Auto-Save</h3>
						<p>Your nominations are automatically saved locally. Come back anytime to continue.</p>
					</div>
				</div>
			</section>

			<section className="cta-section">
				<div className="cta-content">
					<h2>Ready to Start?</h2>
					<p>Join the community of movie lovers and share your top picks.</p>
					<Link to="/app" className="btn-primary btn-large">
						Start Your Nominations
					</Link>
				</div>
			</section>

			<footer className="landing-footer">
				<p>Built with React & OMDB API</p>
				<p>&copy; 2026 MovieNominate. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default LandingPage;
