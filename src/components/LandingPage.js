import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onNavigate }) => {
	return (
		<div className="landing-page">
			<div className="landing-content">
				<div className="hero-section">
					<h1 className="hero-title">Welcome to My App</h1>
					<p className="hero-subtitle">
						Discover movies and enjoy a game of chess
					</p>
				</div>

				<div className="features-section">
					<div className="feature-card" onClick={() => onNavigate('movies')}>
						<div className="feature-icon">🎬</div>
						<h3 className="feature-title">Movie Nominations</h3>
						<p className="feature-description">
							Search for your favorite movies and create a list of nominations.
							Find the perfect films to watch!
						</p>
						<button className="feature-button">Explore Movies</button>
					</div>

					<div className="feature-card" onClick={() => onNavigate('chess')}>
						<div className="feature-icon">♟️</div>
						<h3 className="feature-title">Chess Game</h3>
						<p className="feature-description">
							Challenge yourself with an interactive chess game.
							Test your strategic thinking and enjoy classic gameplay.
						</p>
						<button className="feature-button">Play Chess</button>
					</div>
				</div>

				<div className="cta-section">
					<p className="cta-text">Ready to get started?</p>
					<p className="cta-subtext">Choose an option above to begin your journey</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
