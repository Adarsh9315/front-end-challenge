import React from 'react';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className="landing-page">
			<div className="landing-hero">
				<div className="landing-content">
					<h1 className="landing-title">
						<span className="title-icon">🎬</span>
						Movie Nominations
					</h1>
					<p className="landing-subtitle">
						Discover your favorite films and nominate them for the awards they deserve
					</p>
					<div className="landing-features">
						<div className="feature-item">
							<div className="feature-icon">🔍</div>
							<div className="feature-text">
								<h3>Search Movies</h3>
								<p>Browse through thousands of movies from the Open Movie Database</p>
							</div>
						</div>
						<div className="feature-item">
							<div className="feature-icon">⭐</div>
							<div className="feature-text">
								<h3>Nominate Favorites</h3>
								<p>Select up to 5 movies you think deserve recognition</p>
							</div>
						</div>
						<div className="feature-item">
							<div className="feature-icon">📋</div>
							<div className="feature-text">
								<h3>Manage Your List</h3>
								<p>Your nominations are saved locally so you can return anytime</p>
							</div>
						</div>
					</div>
					<button className="landing-cta" onClick={onGetStarted}>
						Get Started
						<span className="cta-arrow">→</span>
					</button>
				</div>
			</div>
			<div className="landing-background">
				<div className="bg-gradient"></div>
				<div className="bg-pattern"></div>
			</div>
		</div>
	);
};

export default LandingPage;
