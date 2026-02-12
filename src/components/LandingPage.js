import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-hero">
				<div className="hero-content">
					<h1 className="hero-title">Welcome to My App Collection</h1>
					<p className="hero-subtitle">
						Explore our collection of interactive applications and games
					</p>
					<div className="hero-buttons">
						<Link to="/movies" className="btn btn-primary btn-lg">
							Movie App
						</Link>
						<Link to="/chess" className="btn btn-secondary btn-lg">
							Chess Game
						</Link>
					</div>
				</div>
			</div>

			<div className="features-section">
				<div className="container">
					<h2 className="section-title">Featured Applications</h2>
					<div className="features-grid">
						<div className="feature-card">
							<div className="feature-icon">🎬</div>
							<h3 className="feature-title">Movie App</h3>
							<p className="feature-description">
								Search and nominate your favorite movies using the OMDB API. 
								Build your personal movie nomination list.
							</p>
							<Link to="/movies" className="feature-link">
								Explore Movies →
							</Link>
						</div>

						<div className="feature-card">
							<div className="feature-icon">♟️</div>
							<h3 className="feature-title">Chess Game</h3>
							<p className="feature-description">
								Play a classic game of chess. Challenge yourself with this 
								interactive chess board.
							</p>
							<Link to="/chess" className="feature-link">
								Play Chess →
							</Link>
						</div>
					</div>
				</div>
			</div>

			<footer className="landing-footer">
				<p>&copy; 2026 My App Collection. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default LandingPage;
