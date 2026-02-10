import React from 'react';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className='landing-page'>
			<div className='landing-hero'>
				<div className='landing-hero-overlay'></div>
				<div className='landing-hero-content'>
					<span className='landing-badge'>OMDB Movie Awards</span>
					<h1 className='landing-title'>
						The Shoppies
					</h1>
					<p className='landing-subtitle'>
						Discover your favorite films and nominate them for the ultimate movie awards.
						Search thousands of titles, curate your top 5, and make your voice heard.
					</p>
					<button className='landing-cta' onClick={onGetStarted}>
						Get Started
					</button>
				</div>
			</div>

			<div className='landing-features'>
				<div className='container'>
					<h2 className='landing-features-title'>How It Works</h2>
					<p className='landing-features-subtitle'>
						Three simple steps to nominate your favorite movies
					</p>
					<div className='row justify-content-center'>
						<div className='col-md-4 mb-4'>
							<div className='landing-feature-card'>
								<div className='landing-feature-number'>1</div>
								<h3 className='landing-feature-heading'>Search Movies</h3>
								<p className='landing-feature-text'>
									Browse the vast OMDB database with real-time search. Find any movie by title instantly.
								</p>
							</div>
						</div>
						<div className='col-md-4 mb-4'>
							<div className='landing-feature-card'>
								<div className='landing-feature-number'>2</div>
								<h3 className='landing-feature-heading'>Nominate Favorites</h3>
								<p className='landing-feature-text'>
									Found a gem? Add it to your nominations list with a single click. You get up to 5 picks.
								</p>
							</div>
						</div>
						<div className='col-md-4 mb-4'>
							<div className='landing-feature-card'>
								<div className='landing-feature-number'>3</div>
								<h3 className='landing-feature-heading'>Track &amp; Manage</h3>
								<p className='landing-feature-text'>
									Review your nominations anytime. Change your mind? Remove and replace picks effortlessly.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='landing-cta-section'>
				<h2 className='landing-cta-heading'>Ready to Pick Your Winners?</h2>
				<p className='landing-cta-text'>
					Your nominations are saved locally so you can come back anytime.
				</p>
				<button className='landing-cta landing-cta-alt' onClick={onGetStarted}>
					Start Nominating
				</button>
			</div>

			<footer className='landing-footer'>
				<p>Powered by OMDB API &middot; Built with React</p>
			</footer>
		</div>
	);
};

export default LandingPage;
