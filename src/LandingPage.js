import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-container">
				<div className="hero-section">
					<h1 className="main-title">Welcome to My App</h1>
					<p className="subtitle">Your one-stop destination for entertainment and games</p>
				</div>

				<div className="features-section">
					<div className="feature-card">
						<div className="feature-icon">🎬</div>
						<h2>Movie Search</h2>
						<p>Discover and explore movies from the OMDB database. Search for your favorites, read details, and nominate movies for higher ratings.</p>
						<Link to="/movies" className="feature-button">
							Explore Movies
						</Link>
					</div>

					<div className="feature-card">
						<div className="feature-icon">♟️</div>
						<h2>Chess Game</h2>
						<p>Challenge yourself with an interactive chess game. Play, practice, and improve your chess skills right in your browser.</p>
						<Link to="/chess" className="feature-button">
							Play Chess
						</Link>
					</div>
				</div>

				<div className="footer-section">
					<p>Built with React • Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
