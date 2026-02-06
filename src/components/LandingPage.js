import React from 'react';

const LandingPage = ({ onGetStarted }) => {
	return (
		<section className='landing-page'>
			<div className='landing-hero'>
				<p className='tagline'>Curate the ultimate movie night</p>
				<h1>The Shoppies</h1>
				<p className='subheadline'>
					Discover titles powered by the OMDB database, nominate your top five, and
					share the definitive watchlist with friends.
				</p>
				<div className='hero-cta'>
					<button className='primary-btn' onClick={onGetStarted}>
						Start Nominating
					</button>
					<a href='https://www.omdbapi.com/' target='_blank' rel='noreferrer'>
						Learn about OMDB
					</a>
				</div>
			</div>
			<div className='landing-highlights'>
				<div>
					<h3>Real-time search</h3>
					<p>Type to see instant matches from the OMDB catalog.</p>
				</div>
				<div>
					<h3>Top five tracker</h3>
					<p>Nominate up to five favorites and manage them with one click.</p>
				</div>
				<div>
					<h3>Save & share</h3>
					<p>Your nominations persist locally so you can keep refining the list.</p>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;