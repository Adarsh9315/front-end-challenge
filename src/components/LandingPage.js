import React from 'react';

const LandingPage = ({ onEnter }) => {
	return (
		<div className='landing-page'>
			<div className='landing-hero'>
				<div className='landing-hero-content'>
					<div className='landing-badge'>OMDB Movie Awards</div>
					<h1 className='landing-title'>
						Discover & Nominate<br />
						<span className='landing-title-accent'>Your Favorite Movies</span>
					</h1>
					<p className='landing-subtitle'>
						Search through thousands of movies, pick your top 5 favorites,
						and nominate them for the ultimate movie awards.
					</p>
					<button className='landing-cta' onClick={onEnter}>
						Get Started
					</button>
				</div>
				<div className='landing-hero-visual'>
					<div className='landing-card landing-card-1'>
						<div className='landing-card-poster'></div>
						<div className='landing-card-info'>
							<div className='landing-card-title-bar'></div>
							<div className='landing-card-year-bar'></div>
						</div>
					</div>
					<div className='landing-card landing-card-2'>
						<div className='landing-card-poster'></div>
						<div className='landing-card-info'>
							<div className='landing-card-title-bar'></div>
							<div className='landing-card-year-bar'></div>
						</div>
					</div>
					<div className='landing-card landing-card-3'>
						<div className='landing-card-poster'></div>
						<div className='landing-card-info'>
							<div className='landing-card-title-bar'></div>
							<div className='landing-card-year-bar'></div>
						</div>
					</div>
				</div>
			</div>

			<div className='landing-features'>
				<div className='container'>
					<h2 className='landing-features-heading'>How It Works</h2>
					<div className='row'>
						<div className='col-md-4'>
							<div className='landing-feature-card'>
								<div className='landing-feature-number'>1</div>
								<h3 className='landing-feature-title'>Search Movies</h3>
								<p className='landing-feature-desc'>
									Browse the vast OMDB database. Search by title to find any movie ever made.
								</p>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='landing-feature-card'>
								<div className='landing-feature-number'>2</div>
								<h3 className='landing-feature-title'>Nominate Favorites</h3>
								<p className='landing-feature-desc'>
									Found a gem? Nominate it with a single click. You get up to 5 nominations.
								</p>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='landing-feature-card'>
								<div className='landing-feature-number'>3</div>
								<h3 className='landing-feature-title'>Manage Your Picks</h3>
								<p className='landing-feature-desc'>
									Changed your mind? Remove nominations anytime and replace them with new picks.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='landing-footer'>
				<p>Powered by the Open Movie Database API</p>
			</div>
		</div>
	);
};

export default LandingPage;
