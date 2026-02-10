import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-container">
				<header className="landing-header">
					<h1 className="landing-title">Welcome to Entertainment Hub</h1>
					<p className="landing-subtitle">Your destination for movies and games</p>
				</header>

				<div className="features-container">
					<div className="feature-card">
						<div className="feature-icon">🎬</div>
						<h2>Movie Nominations</h2>
						<p>Search and nominate your favorite movies. Create your personal list of top 5 movie picks.</p>
						<Link to="/movies" className="feature-button">
							Explore Movies
						</Link>
					</div>

					<div className="feature-card">
						<div className="feature-icon">♟️</div>
						<h2>Chess Game</h2>
						<p>Challenge yourself with a game of chess. Practice your strategy and improve your skills.</p>
						<Link to="/chess" className="feature-button">
							Play Chess
						</Link>
					</div>
				</div>

				<footer className="landing-footer">
					<p>Choose your entertainment and get started!</p>
				</footer>
			</div>
		</div>
	);
};

export default LandingPage;
