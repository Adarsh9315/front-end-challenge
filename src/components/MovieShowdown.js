import React, { useEffect, useMemo, useState } from 'react';

const getRandomMatchup = (movies) => {
	if (!movies || movies.length < 2) {
		return [];
	}

	const firstIndex = Math.floor(Math.random() * movies.length);
	let secondIndex = Math.floor(Math.random() * movies.length);

	while (secondIndex === firstIndex) {
		secondIndex = Math.floor(Math.random() * movies.length);
	}

	return [movies[firstIndex], movies[secondIndex]];
};

const MovieShowdown = ({ nominations }) => {
	const [matchup, setMatchup] = useState([]);
	const [wins, setWins] = useState({});
	const [lastWinnerId, setLastWinnerId] = useState(null);

	useEffect(() => {
		const storedWins = localStorage.getItem('showdownWins');
		if (!storedWins) {
			return;
		}

		try {
			const parsed = JSON.parse(storedWins);
			if (parsed && typeof parsed === 'object') {
				setWins(parsed);
			}
		} catch (error) {
			localStorage.removeItem('showdownWins');
		}
	}, []);

	useEffect(() => {
		if (!nominations || nominations.length < 2) {
			setMatchup([]);
			return;
		}

		setMatchup((current) => {
			if (
				current.length === 2 &&
				nominations.some((movie) => movie.imdbID === current[0].imdbID) &&
				nominations.some((movie) => movie.imdbID === current[1].imdbID) &&
				current[0].imdbID !== current[1].imdbID
			) {
				return current;
			}

			return getRandomMatchup(nominations);
		});
	}, [nominations]);

	const handleRandomize = () => {
		setMatchup(getRandomMatchup(nominations));
		setLastWinnerId(null);
	};

	const handlePickWinner = (movie) => {
		setWins((prevWins) => {
			const updated = {
				...prevWins,
				[movie.imdbID]: (prevWins[movie.imdbID] || 0) + 1,
			};
			localStorage.setItem('showdownWins', JSON.stringify(updated));
			return updated;
		});
		setLastWinnerId(movie.imdbID);
	};

	const handleReset = () => {
		setWins({});
		setLastWinnerId(null);
		localStorage.removeItem('showdownWins');
	};

	const scoreboard = useMemo(() => {
		if (!nominations) {
			return [];
		}

		return nominations
			.map((movie) => ({
				...movie,
				wins: wins[movie.imdbID] || 0,
			}))
			.sort((a, b) => {
				if (b.wins !== a.wins) {
					return b.wins - a.wins;
				}
				return a.Title.localeCompare(b.Title);
			});
	}, [nominations, wins]);

	const hasWins = scoreboard.some((movie) => movie.wins > 0);

	return (
		<div className='showdown'>
			<div className='showdown-header'>
				<h2>Movie Showdown</h2>
				<p>Pick a winner from your nominations to build the scoreboard.</p>
			</div>
			{!nominations || nominations.length < 2 ? (
				<div className='showdown-empty'>
					Add at least two nominations to start the showdown.
				</div>
			) : (
				<>
					<div className='showdown-matchup'>
						{matchup.map((movie) => (
							<div
								key={movie.imdbID}
								className={`showdown-card ${
									lastWinnerId === movie.imdbID ? 'winner' : ''
								}`}
							>
								<img
									src={
										movie.Poster !== 'N/A'
											? movie.Poster
											: 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'
									}
									alt={movie.Title}
									className='showdown-poster'
								/>
								<div className='showdown-meta'>
									<div className='showdown-title'>{movie.Title}</div>
									<div className='showdown-year'>{movie.Year}</div>
									<div className='showdown-wins'>
										Wins: {wins[movie.imdbID] || 0}
									</div>
								</div>
								<button
									type='button'
									className='btn-handler showdown-btn'
									onClick={() => handlePickWinner(movie)}
								>
									Pick Winner
								</button>
							</div>
						))}
					</div>
					<div className='showdown-actions'>
						<button
							type='button'
							className='btn-handler showdown-btn'
							onClick={handleRandomize}
						>
							Random Matchup
						</button>
						<button
							type='button'
							className='btn-handler showdown-secondary'
							onClick={handleReset}
						>
							Reset Scores
						</button>
					</div>
				</>
			)}
			<div className='showdown-scoreboard'>
				<div className='showdown-scoreboard-header'>
					<h3>Scoreboard</h3>
					<span>{hasWins ? 'Top picks so far' : 'No wins yet'}</span>
				</div>
				{scoreboard.length === 0 ? (
					<div className='showdown-empty'>
						Nominate movies to build your scoreboard.
					</div>
				) : (
					<div className='showdown-scoreboard-grid'>
						{scoreboard.map((movie) => (
							<div
								key={movie.imdbID}
								className={`scoreboard-item ${
									movie.wins > 0 ? 'active' : ''
								}`}
							>
								<span className='scoreboard-title'>{movie.Title}</span>
								<span className='scoreboard-wins'>
									{movie.wins} wins
								</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MovieShowdown;
