import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className='landing-page'>
			<div className='landing-container'>
				<div className='landing-header'>
					<img
						src='https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png'
						alt='OMDB Logo'
						className='landing-logo'
					/>
					<h1 className='landing-title'>OMDB Movie Nominations</h1>
				</div>

				<div className='landing-content'>
					<p className='landing-description'>
						Discover and nominate your favorite movies using the Open Movie Database (OMDB) API.
					</p>

					<div className='landing-features'>
						<div className='feature-card'>
							<div className='feature-icon'>🔍</div>
							<h3>Search Movies</h3>
							<p>Search through thousands of movies from OMDB's extensive database</p>
						</div>

						<div className='feature-card'>
							<div className='feature-icon'>⭐</div>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 of your favorite movies for nominations</p>
						</div>

						<div className='feature-card'>
							<div className='feature-icon'>💾</div>
							<h3>Save Locally</h3>
							<p>Your nominations are saved in your browser for easy access</p>
						</div>
					</div>

					<Link to='/movies' className='cta-button'>
						Start Exploring Movies
					</Link>
				</div>

				<div className='landing-footer'>
					<p>Powered by OMDB API</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
