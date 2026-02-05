import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const ChessGame = () => {
	const [game, setGame] = useState(new Chess());
	const [gameOver, setGameOver] = useState(false);
	const [winner, setWinner] = useState(null);

	const makeMove = (move) => {
		const gameCopy = new Chess(game.fen());
		const result = gameCopy.move(move);
		
		if (result) {
			setGame(gameCopy);
			
			if (gameCopy.isGameOver()) {
				setGameOver(true);
				if (gameCopy.isCheckmate()) {
					setWinner(gameCopy.turn() === 'w' ? 'Black' : 'White');
				} else {
					setWinner('Draw');
				}
			}
		}
		
		return result;
	};

	const onDrop = ({ sourceSquare, targetSquare }) => {
		const move = makeMove({
			from: sourceSquare,
			to: targetSquare,
			promotion: 'q'
		});

		if (move === null) return 'snapback';
	};

	const resetGame = () => {
		setGame(new Chess());
		setGameOver(false);
		setWinner(null);
	};

	const undoMove = () => {
		const gameCopy = new Chess(game.fen());
		gameCopy.undo();
		setGame(gameCopy);
		setGameOver(false);
		setWinner(null);
	};

	return (
		<div className='container-fluid' style={{ padding: '20px' }}>
			<div className='row'>
				<div className='col-12 text-center mb-4'>
					<h1>Chess Game</h1>
				</div>
			</div>
			<div className='row justify-content-center'>
				<div className='col-12 col-md-8 col-lg-6'>
					<div style={{ maxWidth: '600px', margin: '0 auto' }}>
						<Chessboard
							position={game.fen()}
							onDrop={onDrop}
							width={Math.min(600, window.innerWidth - 40)}
						/>
					</div>
					
					<div className='text-center mt-4'>
						{gameOver && (
							<div className='alert alert-success' role='alert'>
								<h4>Game Over!</h4>
								<p>
									{winner === 'Draw' 
										? 'The game ended in a draw!' 
										: `${winner} wins!`}
								</p>
							</div>
						)}
						
						<div className='mt-3'>
							<p><strong>Turn:</strong> {game.turn() === 'w' ? 'White' : 'Black'}</p>
							{game.isCheck() && !gameOver && (
								<p className='text-danger'><strong>Check!</strong></p>
							)}
						</div>

						<div className='mt-3'>
							<button 
								className='btn btn-primary mr-2' 
								onClick={resetGame}
								style={{ marginRight: '10px' }}
							>
								New Game
							</button>
							<button 
								className='btn btn-secondary' 
								onClick={undoMove}
								disabled={game.history().length === 0}
							>
								Undo Move
							</button>
						</div>

						<div className='mt-4'>
							<h5>Move History</h5>
							<div style={{ 
								maxHeight: '200px', 
								overflowY: 'auto', 
								border: '1px solid #ddd', 
								padding: '10px',
								borderRadius: '5px',
								backgroundColor: '#f8f9fa'
							}}>
								{game.history().length === 0 ? (
									<p className='text-muted'>No moves yet</p>
								) : (
									<p>{game.history().join(', ')}</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChessGame;
