import React from 'react';

const LandingPage = ({ onGetStarted }) => {
	return (
		<div className='landing-page'>
			{/* Decorative background elements */}
			<div className='landing-bg-glow landing-bg-glow--top'></div>
			<div className='landing-bg-glow landing-bg-glow--bottom'></div>

			{/* Navbar */}
			<nav className='landing-nav'>
				<div className='landing-nav__brand'>
					<span className='landing-nav__icon'>&#127916;</span>
					<span className='landing-nav__title'>OMDB</span>
				</div>
				<button className='landing-nav__cta' onClick={onGetStarted}>
					Get Started
				</button>
			</nav>

			{/* Hero Section */}
			<section className='landing-hero'>
				<div className='landing-hero__content'>
					<p className='landing-hero__badge'>Movie Nomination Platform</p>
					<h1 className='landing-hero__heading'>
						Discover, Search &amp;
						<br />
						<span className='landing-hero__heading--accent'>Nominate</span> Your
						<br />
						Favorite Movies
					</h1>
					<p className='landing-hero__subtitle'>
						Explore thousands of movies from the Open Movie Database.
						Search by title, browse results, and nominate up to 5 of your
						all-time favorites for the awards.
					</p>
					<div className='landing-hero__actions'>
						<button className='landing-btn landing-btn--primary' onClick={onGetStarted}>
							Explore Movies
						</button>
						<button className='landing-btn landing-btn--secondary' onClick={onGetStarted}>
							View Nominations
						</button>
					</div>
					<div className='landing-hero__stats'>
						<div className='landing-stat'>
							<span className='landing-stat__number'>500K+</span>
							<span className='landing-stat__label'>Movies</span>
						</div>
						<div className='landing-stat__divider'></div>
						<div className='landing-stat'>
							<span className='landing-stat__number'>5</span>
							<span className='landing-stat__label'>Nominations</span>
						</div>
						<div className='landing-stat__divider'></div>
						<div className='landing-stat'>
							<span className='landing-stat__number'>Free</span>
							<span className='landing-stat__label'>Forever</span>
						</div>
					</div>
				</div>

				<div className='landing-hero__visual'>
					<div className='landing-card-stack'>
						<div className='landing-card-stack__card landing-card-stack__card--back'>
							<div className='landing-card-stack__poster landing-card-stack__poster--1'></div>
						</div>
						<div className='landing-card-stack__card landing-card-stack__card--mid'>
							<div className='landing-card-stack__poster landing-card-stack__poster--2'></div>
						</div>
						<div className='landing-card-stack__card landing-card-stack__card--front'>
							<div className='landing-card-stack__poster landing-card-stack__poster--3'></div>
							<div className='landing-card-stack__badge'>&#9733; Nominated</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='landing-features'>
				<h2 className='landing-features__title'>How It Works</h2>
				<p className='landing-features__subtitle'>
					Three simple steps to nominate your favorite movies
				</p>
				<div className='landing-features__grid'>
					<div className='landing-feature-card'>
						<div className='landing-feature-card__step'>01</div>
						<h3 className='landing-feature-card__title'>Search Movies</h3>
						<p className='landing-feature-card__desc'>
							Type any movie title to instantly search the OMDB database
							with thousands of results at your fingertips.
						</p>
					</div>
					<div className='landing-feature-card'>
						<div className='landing-feature-card__step'>02</div>
						<h3 className='landing-feature-card__title'>Nominate Favorites</h3>
						<p className='landing-feature-card__desc'>
							Found a movie you love? Click nominate to add it to your
							personal list of up to 5 top picks.
						</p>
					</div>
					<div className='landing-feature-card'>
						<div className='landing-feature-card__step'>03</div>
						<h3 className='landing-feature-card__title'>Manage List</h3>
						<p className='landing-feature-card__desc'>
							Review your nominations anytime. Remove or swap movies
							until you are happy with your final selection.
						</p>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='landing-cta'>
				<h2 className='landing-cta__title'>Ready to Pick Your Favorites?</h2>
				<p className='landing-cta__subtitle'>
					Start exploring movies and build your nomination list today.
				</p>
				<button className='landing-btn landing-btn--primary landing-btn--lg' onClick={onGetStarted}>
					Get Started Now
				</button>
			</section>

			{/* Footer */}
			<footer className='landing-footer'>
				<p>Powered by OMDB API &mdash; Built with React</p>
			</footer>
		</div>
	);
};

export default LandingPage;
