import React from 'react';
import { Link } from 'react-router-dom';
import './TournamentLanding.css';

const TournamentLanding = () => {
	return (
		<div className="tournament-landing">
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">
						<span className="title-highlight">Movies Showdown</span>
						<br />
						Tournament
					</h1>
					<p className="hero-subtitle">
						Battle of the Best Films - Vote for Your Favorites and Crown the Ultimate Champion
					</p>
					<Link to="/movies" className="cta-button">
						Start Tournament
					</Link>
				</div>
				<div className="hero-decoration">
					<div className="trophy-icon">🏆</div>
				</div>
			</div>

			<div className="features-section">
				<div className="container">
					<h2 className="section-title">How It Works</h2>
					<div className="features-grid">
						<div className="feature-card">
							<div className="feature-icon">🎬</div>
							<h3 className="feature-title">Search Movies</h3>
							<p className="feature-description">
								Browse through thousands of movies from the OMDB database and discover your favorites
							</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">⭐</div>
							<h3 className="feature-title">Nominate Contenders</h3>
							<p className="feature-description">
								Select up to 5 movies that you think deserve to compete in the ultimate showdown
							</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">🥊</div>
							<h3 className="feature-title">Tournament Battle</h3>
							<p className="feature-description">
								Watch your nominated movies compete head-to-head to determine the champion
							</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon">👑</div>
							<h3 className="feature-title">Crown the Winner</h3>
							<p className="feature-description">
								The last movie standing becomes your personal movie champion of all time
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="stats-section">
				<div className="container">
					<div className="stats-grid">
						<div className="stat-item">
							<div className="stat-number">1000+</div>
							<div className="stat-label">Movies Available</div>
						</div>
						<div className="stat-item">
							<div className="stat-number">5</div>
							<div className="stat-label">Nominations Allowed</div>
						</div>
						<div className="stat-item">
							<div className="stat-number">1</div>
							<div className="stat-label">Ultimate Champion</div>
						</div>
					</div>
				</div>
			</div>

			<div className="cta-section">
				<div className="container">
					<h2 className="cta-title">Ready to Find Your Champion?</h2>
					<p className="cta-text">
						Start your movie tournament journey today and discover which film reigns supreme
					</p>
					<Link to="/movies" className="cta-button-large">
						Begin Your Tournament
					</Link>
				</div>
			</div>
		</div>
	);
};

export default TournamentLanding;
