import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-container">
			<div className="landing-content">
				<h1 className="landing-title">Welcome to Entertainment Hub</h1>
				<p className="landing-description">
					Your one-stop destination for movies and games
				</p>

				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🎬</div>
						<h2>Movie Search</h2>
						<p>Search and discover movies from the OMDB database</p>
						<p>Nominate your favorites and build your top 5 list</p>
					</div>

					<div className="feature-card">
						<div className="feature-icon">♟️</div>
						<h2>Chess Game</h2>
						<p>Play a classic game of chess</p>
						<p>Challenge yourself or practice strategies</p>
					</div>
				</div>

				<div className="cta-buttons">
					<Link to="/movies" className="cta-button cta-primary">
						Explore Movies
					</Link>
					<Link to="/chess" className="cta-button cta-secondary">
						Play Chess
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
