import React, { useState, useEffect } from 'react';

const MovieShowdown = ({ nominations }) => {
	const [movie1, setMovie1] = useState(null);
	const [movie2, setMovie2] = useState(null);
	const [movie1Details, setMovie1Details] = useState(null);
	const [movie2Details, setMovie2Details] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (movie1) {
			fetchMovieDetails(movie1.imdbID, setMovie1Details);
		}
	}, [movie1]);

	useEffect(() => {
		if (movie2) {
			fetchMovieDetails(movie2.imdbID, setMovie2Details);
		}
	}, [movie2]);

	const fetchMovieDetails = async (imdbID, setDetails) => {
		setLoading(true);
		const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=a21d8f2b`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			setDetails(data);
		} catch (error) {
			console.error('Error fetching movie details:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSelectMovie = (movie, slot) => {
		if (slot === 1) {
			setMovie1(movie);
			setMovie1Details(null);
		} else {
			setMovie2(movie);
			setMovie2Details(null);
		}
	};

	const renderMovieCard = (movie, slot) => (
		<div className='showdown-selector'>
			<h3>Select Movie {slot}</h3>
			{nominations.length === 0 ? (
				<p className='no-nominations'>No nominations yet. Add some movies first!</p>
			) : (
				<div className='showdown-movie-list'>
					{nominations.map((m) => (
						<div
							key={m.imdbID}
							className={`showdown-movie-item ${movie?.imdbID === m.imdbID ? 'selected' : ''}`}
							onClick={() => handleSelectMovie(m, slot)}
						>
							<img
								src={m.Poster !== 'N/A' ? m.Poster : 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'}
								alt={m.Title}
							/>
							<div className='showdown-movie-info'>
								<div className='showdown-movie-title'>{m.Title}</div>
								<div className='showdown-movie-year'>{m.Year}</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);

	const renderMovieDetails = (details, movie) => {
		if (!details) return <div className='showdown-details-placeholder'>Select a movie to see details</div>;
		if (loading) return <div className='showdown-loading'>Loading details...</div>;

		return (
			<div className='showdown-details'>
				<img
					src={details.Poster !== 'N/A' ? details.Poster : 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'}
					alt={details.Title}
					className='showdown-poster'
				/>
				<h2 className='showdown-title'>{details.Title}</h2>
				<div className='showdown-meta'>
					<span>{details.Rated}</span>
					<span>{details.Year}</span>
					<span>{details.Runtime}</span>
				</div>
				<div className='showdown-rating'>
					<span className='rating-label'>IMDb Rating:</span>
					<span className='rating-value'>{details.imdbRating !== 'N/A' ? details.imdbRating : 'N/A'}</span>
				</div>
				<div className='showdown-plot'>{details.Plot}</div>
				<div className='showdown-info-grid'>
					<div className='showdown-info-item'>
						<span className='info-label'>Director:</span>
						<span className='info-value'>{details.Director !== 'N/A' ? details.Director : 'N/A'}</span>
					</div>
					<div className='showdown-info-item'>
						<span className='info-label'>Genre:</span>
						<span className='info-value'>{details.Genre !== 'N/A' ? details.Genre : 'N/A'}</span>
					</div>
					<div className='showdown-info-item'>
						<span className='info-label'>Actors:</span>
						<span className='info-value'>{details.Actors !== 'N/A' ? details.Actors : 'N/A'}</span>
					</div>
					<div className='showdown-info-item'>
						<span className='info-label'>Box Office:</span>
						<span className='info-value'>{details.BoxOffice !== 'N/A' ? details.BoxOffice : 'N/A'}</span>
					</div>
				</div>
			</div>
		);
	};

	const getWinner = () => {
		if (!movie1Details || !movie2Details) return null;
		const rating1 = parseFloat(movie1Details.imdbRating) || 0;
		const rating2 = parseFloat(movie2Details.imdbRating) || 0;
		if (rating1 === rating2) return 'tie';
		return rating1 > rating2 ? 1 : 2;
	};

	const winner = getWinner();

	return (
		<div className='showdown-container'>
			<h1 className='showdown-heading'>Movie Showdown</h1>
			<p className='showdown-subheading'>Select two movies from your nominations to compare</p>
			
			<div className='showdown-selectors'>
				{renderMovieCard(movie1, 1)}
				<div className='showdown-vs'>VS</div>
				{renderMovieCard(movie2, 2)}
			</div>

			{movie1 && movie2 && (
				<div className='showdown-comparison'>
					<div className='showdown-comparison-column'>
						{renderMovieDetails(movie1Details, movie1)}
					</div>
					<div className='showdown-comparison-column'>
						{renderMovieDetails(movie2Details, movie2)}
					</div>
				</div>
			)}

			{winner && movie1Details && movie2Details && (
				<div className='showdown-result'>
					{winner === 'tie' ? (
						<h2>It's a tie!</h2>
					) : (
						<h2>
							Winner: {winner === 1 ? movie1Details.Title : movie2Details.Title}
						</h2>
					)}
				</div>
			)}
		</div>
	);
};

export default MovieShowdown;
