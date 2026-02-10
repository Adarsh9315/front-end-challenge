import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">Welcome to My App</h1>
					<p className="hero-subtitle">
						Your all-in-one entertainment hub featuring movies and games
					</p>

					<div className="features-grid">
						<div className="feature-card">
							<div className="feature-icon">🎬</div>
							<h3>Movie Database</h3>
							<p>Search and nominate your favorite movies using the OMDB API</p>
							<Link to="/movies" className="feature-link">
								Explore Movies
							</Link>
						</div>

						<div className="feature-card">
							<div className="feature-icon">♟️</div>
							<h3>Chess Game</h3>
							<p>Play a fully functional chess game with move validation and history</p>
							<Link to="/chess" className="feature-link">
								Play Chess
							</Link>
						</div>
					</div>
				</div>
			</div>

			<footer className="landing-footer">
				<p>Built with React and Bootstrap</p>
			</footer>
		</div>
	);
};

export default LandingPage;
