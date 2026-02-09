import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	const history = useHistory();

	const handleGetStarted = () => {
		history.push('/app');
	};

	return (
		<div className="landing-page">
			<div className="landing-container">
				<div className="landing-content">
					<h1 className="landing-title">Movie Nominations</h1>
					<p className="landing-subtitle">
						Discover and nominate your favorite movies
					</p>
					<p className="landing-description">
						Search through thousands of movies using the OMDB database. 
						Find your favorites and nominate up to 5 movies for higher ratings.
					</p>
					<div className="landing-features">
						<div className="feature-item">
							<div className="feature-icon">🔍</div>
							<h3>Search Movies</h3>
							<p>Search through a vast collection of movies</p>
						</div>
						<div className="feature-item">
							<div className="feature-icon">⭐</div>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 movies to nominate</p>
						</div>
						<div className="feature-item">
							<div className="feature-icon">💾</div>
							<h3>Save Your List</h3>
							<p>Your nominations are saved locally</p>
						</div>
					</div>
					<button className="landing-button" onClick={handleGetStarted}>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
