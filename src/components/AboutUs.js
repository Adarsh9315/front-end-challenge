import React from 'react';

const AboutUs = () => {
	return (
		<div className='container-fluid about-us-page'>
			<div className='row mt-5'>
				<div className='col-12'>
					<h1 className='text-center mb-4'>About Us</h1>
				</div>
			</div>
			<div className='row justify-content-center'>
				<div className='col-lg-8 col-md-10 col-12'>
					<div className='about-content'>
						<h2>Welcome to Movie Nominations</h2>
						<p>
							Movie Nominations is your personal platform to discover and nominate 
							your favorite movies. Built with passion for movie enthusiasts, our 
							application leverages the power of the Open Movie Database (OMDB) API 
							to bring you comprehensive information about thousands of films.
						</p>
						
						<h3 className='mt-4'>What We Offer</h3>
						<ul className='feature-list'>
							<li>
								<strong>Search & Discover:</strong> Search through an extensive 
								database of movies from various genres, years, and countries.
							</li>
							<li>
								<strong>Nominate Your Favorites:</strong> Select up to 5 movies 
								that deserve recognition and higher ratings. Your nominations are 
								saved locally for easy access.
							</li>
							<li>
								<strong>Manage Nominations:</strong> Easily add or remove movies 
								from your nomination list as your preferences change.
							</li>
							<li>
								<strong>User-Friendly Interface:</strong> Enjoy a clean, modern, 
								and responsive design that works seamlessly across all devices.
							</li>
						</ul>

						<h3 className='mt-4'>Our Mission</h3>
						<p>
							We believe that everyone has their own unique taste in cinema, and 
							every movie lover deserves a platform to express their favorites. 
							Our mission is to create a simple yet powerful tool that helps you 
							curate and share your personal list of must-watch films.
						</p>

						<h3 className='mt-4'>Technology</h3>
						<p>
							This application is built using modern web technologies including 
							React.js for a dynamic user experience, Bootstrap for responsive 
							design, and integrates with the OMDB API to provide accurate and 
							up-to-date movie information.
						</p>

						<div className='mt-5 text-center'>
							<p className='text-muted'>
								Start exploring and nominating your favorite movies today!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
