import React from 'react';
import '../LandingPage.css';

const LandingPage = ({ onEnter }) => {
	return (
		<div className='landing-page'>
			<div className='landing-content'>
				<h1 className='landing-title'>Movie Nomination App</h1>
				<p className='landing-description'>
					Search for your favorite movies and nominate up to 5 of them
				</p>
				<div className='landing-features'>
					<div className='feature-item'>
						<h3>Search Movies</h3>
						<p>Browse through thousands of movies from OMDB database</p>
					</div>
					<div className='feature-item'>
						<h3>Nominate Favorites</h3>
						<p>Select up to 5 movies as your nominations</p>
					</div>
					<div className='feature-item'>
						<h3>Save Nominations</h3>
						<p>Your nominations are saved locally for future visits</p>
					</div>
				</div>
				<button className='landing-button' onClick={onEnter}>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
