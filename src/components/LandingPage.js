import React from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="hero-section">
				<h1 className="hero-title">Welcome to Entertainment Hub</h1>
				<p className="hero-subtitle">
					Discover movies and play chess - all in one place
				</p>
			</div>

			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-5 col-sm-12 mb-4">
						<div className="feature-card">
							<div className="feature-icon">🎬</div>
							<h2 className="feature-title">Movie Search</h2>
							<p className="feature-description">
								Search thousands of movies using the OMDB database. 
								Find your favorites, read details, and nominate the best ones.
							</p>
							<ul className="feature-list">
								<li>Search any movie by title</li>
								<li>View detailed information</li>
								<li>Nominate your favorites</li>
								<li>Manage your nominations</li>
							</ul>
							<Link to="/movies" className="feature-button">
								Explore Movies
							</Link>
						</div>
					</div>

					<div className="col-md-5 col-sm-12 mb-4">
						<div className="feature-card">
							<div className="feature-icon">♟️</div>
							<h2 className="feature-title">Chess Game</h2>
							<p className="feature-description">
								Challenge yourself or a friend with our interactive chess game. 
								Perfect for quick matches or serious strategy sessions.
							</p>
							<ul className="feature-list">
								<li>Full chess gameplay</li>
								<li>Interactive board</li>
								<li>Valid move detection</li>
								<li>Play with friends</li>
							</ul>
							<Link to="/chess" className="feature-button">
								Play Chess
							</Link>
						</div>
					</div>
				</div>
			</div>

			<footer className="landing-footer">
				<p>Built with React • Powered by OMDB API</p>
			</footer>
		</div>
	);
};

export default LandingPage;
