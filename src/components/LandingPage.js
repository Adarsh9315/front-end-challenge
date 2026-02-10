import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="container">
				<div className="row justify-content-center align-items-center min-vh-100">
					<div className="col-lg-8 text-center">
						<h1 className="display-3 mb-4 font-weight-bold">Welcome to Movie App</h1>
						<p className="lead mb-5">
							Discover and nominate your favorite movies, or challenge yourself with a game of chess.
						</p>
						<div className="d-flex justify-content-center flex-wrap">
							<Link to="/movies" className="btn btn-primary btn-lg px-5 py-3 mx-3 mb-3">
								🎬 Explore Movies
							</Link>
							<Link to="/chess" className="btn btn-secondary btn-lg px-5 py-3 mx-3 mb-3">
								♟️ Play Chess
							</Link>
						</div>
						<div className="mt-5">
							<p className="text-muted">
								Search for movies, nominate your top 5 favorites, and enjoy a classic game of chess.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
