import React from 'react';

const LandingPage = () => {
	return (
		<section className='landing'>
			<div className='landing-inner'>
				<p className='landing-eyebrow'>Movie night made easy</p>
				<h1 className='landing-title'>Nominate your top movies in minutes</h1>
				<p className='landing-subtitle'>
					Search the OMDb catalog, pick up to five favorites, and share a
					list everyone can rally around.
				</p>
				<div className='landing-actions'>
					<a className='btn btn-primary' href='#search'>
						Start searching
					</a>
					<a className='btn btn-outline-light' href='#nominations'>
						View nominations
					</a>
				</div>
				<div className='landing-highlights'>
					<div className='landing-card'>
						<h3>Instant search</h3>
						<p>Find titles fast with live results from OMDb.</p>
					</div>
					<div className='landing-card'>
						<h3>Five picks</h3>
						<p>Keep the list focused with a simple cap of five.</p>
					</div>
					<div className='landing-card'>
						<h3>Always saved</h3>
						<p>Your nominations stay ready in local storage.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;
