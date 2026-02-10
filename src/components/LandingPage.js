import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage.css';
import Loader from './Loader';

const LandingPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate loading time
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="landing-page">
			<div className="landing-container">
				<header className="landing-header">
					<h1 className="landing-title">Welcome to My App</h1>
					<p className="landing-subtitle">Explore our amazing features</p>
				</header>

				<div className="features-grid">
					<Link to="/movies" className="feature-card">
						<div className="feature-icon">🎬</div>
						<h2 className="feature-title">Movie Nominations</h2>
						<p className="feature-description">
							Search for your favorite movies and create your top 5 nominations list
						</p>
						<span className="feature-cta">Explore Movies →</span>
					</Link>

					<Link to="/chess" className="feature-card">
						<div className="feature-icon">♟️</div>
						<h2 className="feature-title">Chess Game</h2>
						<p className="feature-description">
							Play an interactive chess game and challenge yourself
						</p>
						<span className="feature-cta">Play Chess →</span>
					</Link>
				</div>

				<footer className="landing-footer">
					<p>Choose an option above to get started</p>
				</footer>
			</div>
		</div>
	);
};

export default LandingPage;
