import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">Welcome to Movie Nominator</h1>
					<p className="hero-subtitle">
						Discover movies, nominate your favorites, and enjoy a game of chess
					</p>
					<div className="hero-buttons">
						<Link to="/movies" className="cta-button cta-primary">
							Explore Movies
						</Link>
						<Link to="/chess" className="cta-button cta-secondary">
							Play Chess
						</Link>
					</div>
				</div>
			</div>

			<div className="features-section">
				<div className="container">
					<h2 className="features-heading">What You Can Do</h2>
					<div className="row">
						<div className="col-md-4">
							<div className="feature-card">
								<div className="feature-icon">🎬</div>
								<h3 className="feature-title">Search Movies</h3>
								<p className="feature-description">
									Search through thousands of movies using the OMDB database. 
									Find detailed information about your favorite films.
								</p>
							</div>
						</div>
						<div className="col-md-4">
							<div className="feature-card">
								<div className="feature-icon">⭐</div>
								<h3 className="feature-title">Nominate Favorites</h3>
								<p className="feature-description">
									Select up to 5 movies as your nominations. Your choices are 
									saved locally and persist across sessions.
								</p>
							</div>
						</div>
						<div className="col-md-4">
							<div className="feature-card">
								<div className="feature-icon">♟️</div>
								<h3 className="feature-title">Play Chess</h3>
								<p className="feature-description">
									Take a break and enjoy a game of chess. Challenge yourself 
									or play with a friend.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="cta-section">
				<div className="cta-content">
					<h2 className="cta-heading">Ready to Get Started?</h2>
					<p className="cta-text">
						Start exploring movies and nominating your favorites today
					</p>
					<Link to="/movies" className="cta-button cta-large">
						Get Started
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
