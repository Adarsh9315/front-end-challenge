import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">
						🎬 Movies Showdown Tournament
					</h1>
					<p className="hero-subtitle">
						The Ultimate Battle of Cinema's Greatest
					</p>
					<p className="hero-description">
						Nominate your favorite movies and let them compete in the ultimate showdown. 
						Only the best will survive. Which films will reign supreme?
					</p>
					
					<div className="cta-buttons">
						<Link to="/movies" className="cta-button primary">
							Start Nominating
						</Link>
						<Link to="/chess" className="cta-button secondary">
							Play Chess Game
						</Link>
					</div>
				</div>
			</div>

			<div className="features-section">
				<h2 className="features-title">How It Works</h2>
				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Search Movies</h3>
						<p>Browse through thousands of movies from the OMDB database</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⭐</div>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies that deserve to compete in the tournament</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🏆</div>
						<h3>Build Your Lineup</h3>
						<p>Create your dream team of cinematic masterpieces</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🎯</div>
						<h3>Compete</h3>
						<p>Watch your nominations battle it out for the top spot</p>
					</div>
				</div>
			</div>

			<div className="stats-section">
				<div className="stat-item">
					<div className="stat-number">5</div>
					<div className="stat-label">Max Nominations</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">∞</div>
					<div className="stat-label">Movies Available</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">1</div>
					<div className="stat-label">Champion</div>
				</div>
			</div>

			<div className="call-to-action-section">
				<h2>Ready to Begin?</h2>
				<p>Start building your ultimate movie lineup today!</p>
				<Link to="/movies" className="cta-button large">
					Enter the Tournament
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
