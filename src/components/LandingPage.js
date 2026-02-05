import React from 'react';

const LandingPage = () => {
	return (
		<section className='landing'>
			<div className='landing-inner'>
				<div className='landing-hero'>
					<div className='landing-content'>
						<p className='landing-kicker'>The Shoppies 2026</p>
						<h1>Nominate the movies that defined your year.</h1>
						<p className='landing-subtitle'>
							Search the OMDb catalog, pick up to five favorites, and lock in
							your shortlist in minutes.
						</p>
						<div className='landing-actions'>
							<a className='landing-button primary' href='#search-section'>
								Start nominating
							</a>
							<a className='landing-button ghost' href='#how-it-works'>
								How it works
							</a>
						</div>
						<div className='landing-stats'>
							<div className='landing-stat'>
								<span className='stat-value'>5</span>
								<span className='stat-label'>nominations max</span>
							</div>
							<div className='landing-stat'>
								<span className='stat-value'>1</span>
								<span className='stat-label'>shortlist to share</span>
							</div>
							<div className='landing-stat'>
								<span className='stat-value'>OMDb</span>
								<span className='stat-label'>powered search</span>
							</div>
						</div>
					</div>
					<div className='landing-card'>
						<div className='landing-card-header'>
							<span>Your shortlist</span>
							<span className='landing-card-pill'>Draft</span>
						</div>
						<ul className='landing-card-list'>
							<li className='landing-card-item'>
								<span>Arrival</span>
								<span>2016</span>
							</li>
							<li className='landing-card-item'>
								<span>Parasite</span>
								<span>2019</span>
							</li>
							<li className='landing-card-item'>
								<span>Spider-Man: Across the Spider-Verse</span>
								<span>2023</span>
							</li>
							<li className='landing-card-item'>
								<span>Dune: Part Two</span>
								<span>2024</span>
							</li>
							<li className='landing-card-item'>
								<span>Oppenheimer</span>
								<span>2023</span>
							</li>
						</ul>
						<p className='landing-card-note'>
							Saved automatically in your browser.
						</p>
					</div>
				</div>
				<div className='landing-section' id='how-it-works'>
					<h2>How it works</h2>
					<div className='landing-grid'>
						<div className='landing-step'>
							<h3>Search</h3>
							<p>Find movies by title using the OMDb database.</p>
						</div>
						<div className='landing-step'>
							<h3>Nominate</h3>
							<p>
								Add up to five films. The list locks when you hit the limit.
							</p>
						</div>
						<div className='landing-step'>
							<h3>Share</h3>
							<p>
								Your shortlist stays saved so you can return and share it.
							</p>
						</div>
					</div>
				</div>
				<div className='landing-callout'>
					<div>
						<h3>Ready to build your list?</h3>
						<p>Jump into search and start adding your top picks.</p>
					</div>
					<a className='landing-button primary' href='#search-section'>
						Go to search
					</a>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;
