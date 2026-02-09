import React from 'react';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className='landing-page'>
			<div className='landing-hero'>
				<div className='landing-hero-overlay'></div>
				<div className='landing-hero-content'>
					<p className='landing-tagline'>Discover &amp; Nominate</p>
					<h1 className='landing-title'>
						The <span className='landing-highlight'>Shoppies</span>
					</h1>
					<p className='landing-subtitle'>
						Search through thousands of movies, pick your favorites, and nominate
						up to 5 films for the prestigious Shoppies Award.
					</p>
					<button className='landing-cta' onClick={onGetStarted}>
						Get Started
					</button>
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
									Browse the Open Movie Database with real-time search. Find any
									movie by title instantly.
								</p>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='landing-feature-card'>
								<div className='landing-feature-number'>2</div>
								<h3 className='landing-feature-title'>Nominate Favorites</h3>
								<p className='landing-feature-desc'>
									Found a gem? Add it to your nominations list with a single
									click. You can nominate up to 5 movies.
								</p>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='landing-feature-card'>
								<div className='landing-feature-number'>3</div>
								<h3 className='landing-feature-title'>Manage &amp; Submit</h3>
								<p className='landing-feature-desc'>
									Review your picks, remove any you change your mind about, and
									finalize your nominations.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='landing-footer'>
				<p>Powered by OMDB API &bull; Built with React</p>
			</div>
		</div>
	);
};

export default LandingPage;
