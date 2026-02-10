import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="hero-section">
				<div className="container">
					<div className="hero-content">
						<h1 className="hero-title">Welcome to Entertainment Hub</h1>
						<p className="hero-subtitle">
							Discover movies, nominate your favorites, and challenge yourself with chess
						</p>
						<div className="hero-buttons">
							<Link to="/movies" className="btn btn-primary btn-lg hero-btn">
								Explore Movies
							</Link>
							<Link to="/chess" className="btn btn-outline-light btn-lg hero-btn">
								Play Chess
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="features-section">
				<div className="container">
					<h2 className="section-title">What We Offer</h2>
					<div className="row">
						<div className="col-md-6 mb-4">
							<div className="feature-card">
								<div className="feature-icon">🎬</div>
								<h3 className="feature-title">Movie Search & Nominations</h3>
								<p className="feature-description">
									Search through thousands of movies using the OMDB database. 
									Find your favorites and nominate up to 5 movies for higher ratings.
								</p>
								<ul className="feature-list">
									<li>Search any movie instantly</li>
									<li>View detailed movie information</li>
									<li>Nominate your top 5 favorites</li>
									<li>Manage your nominations easily</li>
								</ul>
								<Link to="/movies" className="btn btn-outline-primary mt-3">
									Start Searching →
								</Link>
							</div>
						</div>

						<div className="col-md-6 mb-4">
							<div className="feature-card">
								<div className="feature-icon">♟️</div>
								<h3 className="feature-title">Chess Game</h3>
								<p className="feature-description">
									Challenge yourself with our interactive chess game. 
									Perfect for both beginners and experienced players.
								</p>
								<ul className="feature-list">
									<li>Full-featured chess board</li>
									<li>Legal move validation</li>
									<li>Interactive gameplay</li>
									<li>Clean, intuitive interface</li>
								</ul>
								<Link to="/chess" className="btn btn-outline-primary mt-3">
									Play Now →
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="footer-section">
				<div className="container">
					<p className="footer-text">
						Built with React • Powered by OMDB API
					</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
