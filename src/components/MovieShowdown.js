import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const MovieShowdown = () => {
	const [nominations, setNominations] = useState([]);
	const [selectedMovies, setSelectedMovies] = useState([]);
	const [movieDetails, setMovieDetails] = useState({});

	useEffect(() => {
		try {
			const savedNominations = localStorage.getItem('nominations');
			if (savedNominations) {
				const movieNomination = JSON.parse(savedNominations);
				if (movieNomination && Array.isArray(movieNomination)) {
					setNominations(movieNomination);
				}
			}
		} catch (error) {
			console.error('Error loading nominations:', error);
		}
	}, []);

	const fetchMovieDetails = async (imdbID) => {
		if (movieDetails[imdbID]) {
			return movieDetails[imdbID];
		}

		const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=a21d8f2b`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Response === 'True') {
			setMovieDetails(prev => ({
				...prev,
				[imdbID]: responseJson
			}));
			return responseJson;
		}
		return null;
	};

	const handleMovieSelect = async (movie) => {
		if (selectedMovies.length < 2) {
			const details = await fetchMovieDetails(movie.imdbID);
			setSelectedMovies([...selectedMovies, { ...movie, details }]);
		} else {
			// Replace the first selected movie
			const details = await fetchMovieDetails(movie.imdbID);
			setSelectedMovies([{ ...movie, details }, selectedMovies[1]]);
		}
	};

	const clearSelection = () => {
		setSelectedMovies([]);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Movie Showdown</h1>
				</div>
				<div className='col-auto'>
					<Link to='/' className='btn btn-secondary'>
						Back to Home
					</Link>
				</div>
			</div>
			<div className='row d-flex align-items-center mb-4'>
				<div className='col'>
					<p>Select up to 2 movies from your nominations to compare them side by side.</p>
				</div>
			</div>
			
			{selectedMovies.length > 0 && (
				<div className='row mb-4'>
					<div className='col text-center'>
						<button className='btn btn-secondary' onClick={clearSelection}>
							Clear Selection
						</button>
					</div>
				</div>
			)}

			{selectedMovies.length === 2 && (
				<div className='row showdown-comparison mb-4'>
					{selectedMovies.map((movie, index) => (
						<div key={movie.imdbID} className='col-md-6'>
							<div className='showdown-card'>
								<img 
									src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} 
									alt={movie.Title}
									className='showdown-poster'
								/>
								<div className='showdown-details'>
									<h2>{movie.Title}</h2>
									{movie.details && (
										<>
											<p><strong>Year:</strong> {movie.details.Year}</p>
											<p><strong>Rated:</strong> {movie.details.Rated}</p>
											<p><strong>Runtime:</strong> {movie.details.Runtime}</p>
											<p><strong>Genre:</strong> {movie.details.Genre}</p>
											<p><strong>Director:</strong> {movie.details.Director}</p>
											<p><strong>Actors:</strong> {movie.details.Actors}</p>
											<p><strong>Plot:</strong> {movie.details.Plot}</p>
											{movie.details.Ratings && movie.details.Ratings.length > 0 && (
												<div className='ratings'>
													<strong>Ratings:</strong>
													{movie.details.Ratings.map((rating, idx) => (
														<p key={idx} className='rating-item'>
															{rating.Source}: {rating.Value}
														</p>
													))}
												</div>
											)}
											{movie.details.imdbRating && (
												<p className='imdb-rating'>
													<strong>IMDB Rating:</strong> {movie.details.imdbRating}/10
												</p>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			<div className='row'>
				<div className='col'>
					<h3>Your Nominations</h3>
				</div>
			</div>
			<div className='row'>
				{nominations.length === 0 ? (
					<div className='col'>
						<p>No nominations yet. Go back to add some movies!</p>
					</div>
				) : (
					nominations.map((movie, index) => {
						const isSelected = selectedMovies.some(m => m.imdbID === movie.imdbID);
						return (
							<div 
								key={index} 
								className={`image-container justify-content-start m-3 ${isSelected ? 'selected-movie' : ''}`}
								onClick={() => handleMovieSelect(movie)}
								style={{ cursor: 'pointer' }}
							>
								<img 
									src={movie.Poster !== "N/A" ? movie.Poster : `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg`} 
									style={{height: '40vh'}} 
									alt='movie'
								/>
								<div className='mt-2' style={{width: '250px',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
									{movie.Title}
								</div>
								<div className='mt-2'>
									{movie.Year}
								</div>
								{isSelected && (
									<div className='selected-badge'>Selected</div>
								)}
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default MovieShowdown;
