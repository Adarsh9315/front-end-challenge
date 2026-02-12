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
						<h1 className="display-3 mb-4">Welcome to My App</h1>
						<p className="lead mb-5">
							Discover amazing features including movie nominations and chess gameplay.
							Explore our collection of tools designed to enhance your entertainment experience.
						</p>
						
						<div className="row mt-5">
							<div className="col-md-6 mb-4">
								<div className="feature-card">
									<div className="feature-icon">🎬</div>
									<h3 className="mt-3 mb-3">Movie Nominations</h3>
									<p className="mb-4">
										Search for your favorite movies and create a personalized nomination list.
										Build your top 5 movie selections with ease.
									</p>
									<Link to="/movies" className="btn btn-primary btn-lg">
										Explore Movies
									</Link>
								</div>
							</div>
							
							<div className="col-md-6 mb-4">
								<div className="feature-card">
									<div className="feature-icon">♟️</div>
									<h3 className="mt-3 mb-3">Chess Game</h3>
									<p className="mb-4">
										Challenge yourself with an interactive chess game.
										Test your strategic thinking and enjoy classic gameplay.
									</p>
									<Link to="/chess" className="btn btn-primary btn-lg">
										Play Chess
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
