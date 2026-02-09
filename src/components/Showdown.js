import React, { useState, useEffect, useCallback } from 'react';
import ShowdownCard from './ShowdownCard';

const MOVIE_SEEDS = [
	'Inception', 'The Dark Knight', 'Interstellar', 'The Matrix',
	'Pulp Fiction', 'Fight Club', 'Gladiator', 'The Godfather',
	'Forrest Gump', 'The Shawshank Redemption', 'Titanic', 'Avatar',
	'Jurassic Park', 'Star Wars', 'The Avengers', 'Iron Man',
	'Spider-Man', 'Batman Begins', 'Joker', 'Parasite',
	'The Lion King', 'Toy Story', 'Finding Nemo', 'Frozen',
	'Mad Max', 'John Wick', 'Rocky', 'Jaws',
	'Alien', 'Terminator', 'Die Hard', 'Braveheart'
];

const API_KEY = 'a21d8f2b';

const Showdown = () => {
	const [fighters, setFighters] = useState([null, null]);
	const [votes, setVotes] = useState({});
	const [loading, setLoading] = useState(true);
	const [round, setRound] = useState(1);
	const [lastWinner, setLastWinner] = useState(null);
	const [showSplash, setShowSplash] = useState(false);

	useEffect(() => {
		const savedVotes = JSON.parse(localStorage.getItem('showdown-votes'));
		if (savedVotes) {
			setVotes(savedVotes);
		}
	}, []);

	const fetchMovie = async (title) => {
		try {
			const response = await fetch(
				`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
			);
			const data = await response.json();
			if (data.Response === 'True') {
				return data;
			}
			return null;
		} catch {
			return null;
		}
	};

	const pickTwoRandom = () => {
		const shuffled = [...MOVIE_SEEDS].sort(() => 0.5 - Math.random());
		return [shuffled[0], shuffled[1]];
	};

	const loadFighters = useCallback(async () => {
		setLoading(true);
		setLastWinner(null);
		const [title1, title2] = pickTwoRandom();
		const [movie1, movie2] = await Promise.all([
			fetchMovie(title1),
			fetchMovie(title2),
		]);

		if (movie1 && movie2) {
			setFighters([movie1, movie2]);
		} else {
			const fallback1 = movie1 || { Title: title1, Year: 'N/A', Poster: 'N/A', imdbID: title1 };
			const fallback2 = movie2 || { Title: title2, Year: 'N/A', Poster: 'N/A', imdbID: title2 };
			setFighters([fallback1, fallback2]);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		loadFighters();
	}, [loadFighters]);

	const handleVote = (movie) => {
		const newVotes = { ...votes };
		const id = movie.imdbID;
		newVotes[id] = (newVotes[id] || 0) + 1;

		if (!newVotes[`_title_${id}`]) {
			newVotes[`_title_${id}`] = movie.Title;
			newVotes[`_poster_${id}`] = movie.Poster;
		}

		setVotes(newVotes);
		localStorage.setItem('showdown-votes', JSON.stringify(newVotes));

		setLastWinner(movie.Title);
		setShowSplash(true);
		setTimeout(() => {
			setShowSplash(false);
		}, 1200);
	};

	const handleNextFight = () => {
		setRound((r) => r + 1);
		loadFighters();
	};

	const getLeaderboard = () => {
		const entries = Object.entries(votes)
			.filter(([key]) => !key.startsWith('_'))
			.map(([id, count]) => ({
				id,
				title: votes[`_title_${id}`] || id,
				poster: votes[`_poster_${id}`] || 'N/A',
				count,
			}))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10);
		return entries;
	};

	const leaderboard = getLeaderboard();

	return (
		<div className='showdown-container'>
			<div className='showdown-header'>
				<h1 className='showdown-main-title'>
					<span className='showdown-emoji'>🎬</span>
					MOVIE SHOWDOWN
					<span className='showdown-emoji'>🥊</span>
				</h1>
				<p className='showdown-subtitle'>Pick your champion! Vote for the movie that deserves to win.</p>
				<div className='showdown-round-badge'>ROUND {round}</div>
			</div>

			{showSplash && lastWinner && (
				<div className='showdown-splash'>
					<div className='showdown-splash-inner'>
						💥 {lastWinner} WINS THIS ROUND! 💥
					</div>
				</div>
			)}

			{loading ? (
				<div className='showdown-loading'>
					<div className='showdown-loading-spinner'></div>
					<p>Loading fighters...</p>
				</div>
			) : (
				<div className='showdown-arena'>
					<ShowdownCard
						movie={fighters[0]}
						onVote={handleVote}
						voteCount={votes[fighters[0]?.imdbID] || 0}
						side='left'
					/>

					<div className='showdown-vs'>
						<div className='showdown-vs-circle'>
							<span>VS</span>
						</div>
						<div className='showdown-vs-lightning'></div>
					</div>

					<ShowdownCard
						movie={fighters[1]}
						onVote={handleVote}
						voteCount={votes[fighters[1]?.imdbID] || 0}
						side='right'
					/>
				</div>
			)}

			<div className='showdown-actions'>
				<button className='showdown-next-btn' onClick={handleNextFight}>
					⚔️ NEXT FIGHT
				</button>
			</div>

			{leaderboard.length > 0 && (
				<div className='showdown-leaderboard'>
					<h2 className='showdown-leaderboard-title'>
						🏆 Hall of Champions
					</h2>
					<div className='showdown-leaderboard-list'>
						{leaderboard.map((entry, index) => (
							<div
								key={entry.id}
								className={`showdown-leaderboard-item ${index === 0 ? 'showdown-champion' : ''}`}
							>
								<span className='showdown-rank'>
									{index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
								</span>
								<img
									src={entry.poster !== 'N/A' ? entry.poster : 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'}
									alt={entry.title}
									className='showdown-lb-poster'
								/>
								<span className='showdown-lb-title'>{entry.title}</span>
								<span className='showdown-lb-votes'>
									{entry.count} {entry.count === 1 ? 'vote' : 'votes'}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Showdown;
