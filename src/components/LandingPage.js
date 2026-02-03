import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className='landing-page'>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className='container'>
					<a className='navbar-brand' href='/'>
						🎬 Movie Nominations
					</a>
					<div className='ml-auto'>
						<Link to='/app' className='btn btn-primary'>
							Get Started
						</Link>
					</div>
				</div>
			</nav>

			<section className='hero-section'>
				<div className='container text-center'>
					<h1 className='hero-title'>Nominate Your Favorite Movies</h1>
					<p className='hero-subtitle'>
						Search for your favorite films and create your personal nomination list. 
						Choose up to 5 movies that deserve recognition!
					</p>
					<Link to='/app' className='btn btn-hero btn-lg'>
						Start Nominating
					</Link>
				</div>
			</section>

			<section className='features-section'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-4 text-center mb-4'>
							<div className='feature-icon'>🔍</div>
							<h3>Search Movies</h3>
							<p>Browse through thousands of movies using our powerful search functionality.</p>
						</div>
						<div className='col-md-4 text-center mb-4'>
							<div className='feature-icon'>⭐</div>
							<h3>Nominate Favorites</h3>
							<p>Select up to 5 movies that you think deserve to be recognized.</p>
						</div>
						<div className='col-md-4 text-center mb-4'>
							<div className='feature-icon'>📋</div>
							<h3>Manage Your List</h3>
							<p>Keep track of your nominations and modify them anytime.</p>
						</div>
					</div>
				</div>
			</section>

			<section className='cta-section'>
				<div className='container text-center'>
					<h2>Ready to Start?</h2>
					<p>Join now and create your personal movie nomination list!</p>
					<Link to='/app' className='btn btn-outline-light btn-lg'>
						Begin Your Journey
					</Link>
				</div>
			</section>

			<footer className='footer'>
				<div className='container text-center'>
					<p>&copy; 2024 Movie Nominations. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;