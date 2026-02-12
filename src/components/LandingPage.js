import React from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-container">
				<header className="landing-header">
					<h1 className="landing-title">Welcome to Entertainment Hub</h1>
					<p className="landing-subtitle">Your one-stop destination for movies and games</p>
				</header>

				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🎬</div>
						<h2>Movie App</h2>
						<p>Search and nominate your favorite movies using the OMDB database. Discover new films and keep track of your top picks.</p>
						<Link to="/movies" className="feature-button">
							Explore Movies
						</Link>
					</div>

					<div className="feature-card">
						<div className="feature-icon">♟️</div>
						<h2>Chess Game</h2>
						<p>Challenge yourself with an interactive chess game. Practice your strategies and improve your skills.</p>
						<Link to="/chess" className="feature-button">
							Play Chess
						</Link>
					</div>
				</div>

				<footer className="landing-footer">
					<p>Choose an application above to get started</p>
				</footer>
			</div>
		</div>
	);
};

export default LandingPage;
