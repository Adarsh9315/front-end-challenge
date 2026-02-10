import React from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">Welcome to My App</h1>
					<p className="hero-subtitle">
						Discover amazing movies and play chess - all in one place
					</p>
					<div className="hero-buttons">
						<Link to="/movies" className="btn btn-primary btn-lg">
							Explore Movies
						</Link>
						<Link to="/chess" className="btn btn-outline-light btn-lg">
							Play Chess
						</Link>
					</div>
				</div>
			</div>

			<div className="features-section">
				<div className="container">
					<h2 className="section-title">Features</h2>
					<div className="row">
						<div className="col-md-6 feature-card">
							<div className="feature-icon">🎬</div>
							<h3>Movie Search</h3>
							<p>
								Search through thousands of movies using the OMDB API. 
								Find detailed information about your favorite films.
							</p>
							<ul className="feature-list">
								<li>Search any movie by title</li>
								<li>View detailed movie information</li>
								<li>Nominate your favorite movies</li>
								<li>Save up to 5 nominations</li>
							</ul>
							<Link to="/movies" className="feature-link">
								Go to Movies →
							</Link>
						</div>

						<div className="col-md-6 feature-card">
							<div className="feature-icon">♟️</div>
							<h3>Chess Game</h3>
							<p>
								Enjoy a classic game of chess with a beautiful interface. 
								Play against a friend on the same device.
							</p>
							<ul className="feature-list">
								<li>Interactive chess board</li>
								<li>Legal move validation</li>
								<li>Turn-based gameplay</li>
								<li>Clean and intuitive UI</li>
							</ul>
							<Link to="/chess" className="feature-link">
								Play Chess →
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="footer-section">
				<div className="container">
					<p>Built with React • Bootstrap • OMDB API • Chess.js</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
