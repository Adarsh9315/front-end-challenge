import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-container">
				<div className="hero-section">
					<h1 className="hero-title">Welcome to Movie App</h1>
					<p className="hero-subtitle">
						Discover movies, create nominations, and enjoy a game of chess
					</p>
				</div>

				<div className="features-section">
					<div className="row">
						<div className="col-md-6 feature-card">
							<div className="feature-icon">🎬</div>
							<h3 className="feature-title">Movie Search</h3>
							<p className="feature-description">
								Search for your favorite movies using the OMDB API. Browse through
								thousands of titles and create your personal nomination list.
							</p>
							<Link to="/movies" className="feature-button">
								Explore Movies
							</Link>
						</div>

						<div className="col-md-6 feature-card">
							<div className="feature-icon">♟️</div>
							<h3 className="feature-title">Chess Game</h3>
							<p className="feature-description">
								Challenge yourself with an interactive chess game. Play against
								yourself or practice your moves in this classic board game.
							</p>
							<Link to="/chess" className="feature-button">
								Play Chess
							</Link>
						</div>
					</div>
				</div>

				<div className="cta-section">
					<h2 className="cta-title">Get Started</h2>
					<p className="cta-description">
						Choose an activity above to begin your journey
					</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
