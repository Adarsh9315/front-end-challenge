import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-container">
				<h1 className="landing-title">Welcome to Entertainment Hub</h1>
				<p className="landing-subtitle">Choose your experience</p>

				<div className="landing-cards">
					<Link to="/movies" className="landing-card">
						<div className="card-content">
							<div className="card-icon">🎬</div>
							<h2>Movie Nominations</h2>
							<p>Search and nominate your favorite movies</p>
						</div>
					</Link>

					<Link to="/chess" className="landing-card">
						<div className="card-content">
							<div className="card-icon">♟️</div>
							<h2>Chess Game</h2>
							<p>Challenge yourself with a game of chess</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
