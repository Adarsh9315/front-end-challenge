import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import '../TournamentLanding.css';

const TournamentLanding = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate initial loading
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <Loader message="Preparing the Tournament..." />;
	}

	return (
		<div className="tournament-landing">
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="tournament-title">
						<span className="title-accent">Movies</span> Showdown Tournament
					</h1>
					<p className="tournament-subtitle">
						Battle of the Best Films - Vote for Your Champions
					</p>
					<div className="hero-description">
						<p>
							Welcome to the ultimate cinematic showdown! Nominate your top 5 favorite movies
							and compete against other film enthusiasts. Only the greatest films will survive
							the tournament brackets.
						</p>
					</div>
					<div className="cta-buttons">
						<Link to="/movies" className="cta-button primary">
							Start Nominating
							<span className="button-arrow">→</span>
						</Link>
						<a href="#how-it-works" className="cta-button secondary">
							Learn More
						</a>
					</div>
				</div>
				<div className="hero-visual">
					<div className="film-reel">
						<div className="film-frame"></div>
						<div className="film-frame"></div>
						<div className="film-frame"></div>
					</div>
				</div>
			</div>

			<div className="features-section" id="how-it-works">
				<h2 className="section-title">How It Works</h2>
				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🎬</div>
						<h3>Nominate</h3>
						<p>Search and select up to 5 movies from our extensive database to enter into the tournament.</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⚔️</div>
						<h3>Battle</h3>
						<p>Watch your nominated films compete in head-to-head matchups against other participants' choices.</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🏆</div>
						<h3>Champion</h3>
						<p>The best movies rise to the top through community voting to claim the championship title.</p>
					</div>
				</div>
			</div>

			<div className="stats-section">
				<div className="stat-item">
					<div className="stat-number">1000+</div>
					<div className="stat-label">Movies Available</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">5</div>
					<div className="stat-label">Nominations Per User</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">∞</div>
					<div className="stat-label">Film Possibilities</div>
				</div>
			</div>

			<div className="tournament-info">
				<div className="info-content">
					<h2 className="section-title">Tournament Rules</h2>
					<ul className="rules-list">
						<li>Each participant can nominate up to 5 movies</li>
						<li>Movies must be from the OMDB database</li>
						<li>Nominations are saved to your browser</li>
						<li>All genres and years are welcome</li>
						<li>May the best films win!</li>
					</ul>
					<div className="ready-section">
						<h3>Ready to Join the Showdown?</h3>
						<Link to="/movies" className="cta-button primary large">
							Enter Tournament
							<span className="button-arrow">→</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TournamentLanding;
