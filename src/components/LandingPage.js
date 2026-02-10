import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="container">
				<div className="row justify-content-center align-items-center min-vh-100">
					<div className="col-lg-8 text-center">
						<h1 className="display-3 mb-4 landing-title">Welcome to My App</h1>
						<p className="lead mb-5 landing-subtitle">
							Discover movies and play chess - all in one place
						</p>
						
						<div className="row mt-5">
							<div className="col-md-6 mb-4">
								<div className="feature-card">
									<div className="feature-icon mb-3">🎬</div>
									<h3 className="mb-3">Movie Nominations</h3>
									<p className="mb-4">
										Search for your favorite movies and create a list of up to 5 nominations. 
										Powered by OMDB API.
									</p>
									<Link to="/movies" className="btn btn-primary btn-lg">
										Explore Movies
									</Link>
								</div>
							</div>
							
							<div className="col-md-6 mb-4">
								<div className="feature-card">
									<div className="feature-icon mb-3">♟️</div>
									<h3 className="mb-3">Chess Game</h3>
									<p className="mb-4">
										Play a game of chess right in your browser. Challenge yourself 
										with this classic strategy game.
									</p>
									<Link to="/chess" className="btn btn-primary btn-lg">
										Play Chess
									</Link>
								</div>
							</div>
						</div>
						
						<div className="mt-5">
							<Link to="/movies" className="btn btn-outline-light btn-lg mr-3">
								Get Started
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
