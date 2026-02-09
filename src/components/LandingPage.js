import React from 'react';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className='landing-page'>
			<div className='landing-overlay'></div>

			{/* Floating film elements */}
			<div className='landing-film-strip landing-film-strip-1'></div>
			<div className='landing-film-strip landing-film-strip-2'></div>
			<div className='landing-film-strip landing-film-strip-3'></div>

			<div className='landing-content'>
				{/* Navigation */}
				<nav className='landing-nav'>
					<div className='landing-logo'>
						<span className='landing-logo-icon'>&#127916;</span>
						<span className='landing-logo-text'>The Shoppies</span>
					</div>
				</nav>

				{/* Hero Section */}
				<section className='landing-hero'>
					<div className='landing-hero-badge'>
						&#127942; Movie Awards 2026
					</div>
					<h1 className='landing-hero-title'>
						Nominate Your
						<br />
						<span className='landing-hero-highlight'>Favorite Movies</span>
					</h1>
					<p className='landing-hero-subtitle'>
						Search through thousands of movies and nominate up to 5 of your
						all-time favorites for The Shoppies Award. Your voice matters
						&mdash; help us celebrate the best in cinema.
					</p>
					<button className='landing-cta' onClick={onGetStarted}>
						Get Started
						<span className='landing-cta-arrow'>&rarr;</span>
					</button>
					<p className='landing-hero-note'>
						No sign-up required &bull; Completely free
					</p>
				</section>

				{/* Features Section */}
				<section className='landing-features'>
					<div className='landing-feature-card'>
						<div className='landing-feature-icon'>&#128269;</div>
						<h3 className='landing-feature-title'>Search Movies</h3>
						<p className='landing-feature-desc'>
							Explore a vast database of movies powered by OMDB. Find any
							title from classics to the latest releases.
						</p>
					</div>
					<div className='landing-feature-card'>
						<div className='landing-feature-icon'>&#11088;</div>
						<h3 className='landing-feature-title'>Nominate Favorites</h3>
						<p className='landing-feature-desc'>
							Pick up to 5 movies you believe deserve recognition. Each
							nomination counts toward the final award.
						</p>
					</div>
					<div className='landing-feature-card'>
						<div className='landing-feature-icon'>&#127941;</div>
						<h3 className='landing-feature-title'>Track Nominations</h3>
						<p className='landing-feature-desc'>
							Your nominations are saved automatically. Review, manage, and
							update your picks anytime you want.
						</p>
					</div>
				</section>

				{/* Footer */}
				<footer className='landing-footer'>
					<p>Built with &#10084;&#65039; for movie lovers everywhere</p>
				</footer>
			</div>
		</div>
	);
};

export default LandingPage;
