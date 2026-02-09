import React, { useState, useEffect } from 'react';
const Chess = require('chess.js');
import '../ChessGame.css';

const ChessGame = () => {
	const [game, setGame] = useState(new Chess());
	const [board, setBoard] = useState(game.board());
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [possibleMoves, setPossibleMoves] = useState([]);
	const [status, setStatus] = useState('');
	const [moveHistory, setMoveHistory] = useState([]);

	useEffect(() => {
		updateStatus();
	}, [board]);

	const updateStatus = () => {
		let statusText = '';

		if (game.isCheckmate()) {
			statusText = `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`;
		} else if (game.isDraw()) {
			statusText = 'Draw!';
		} else if (game.isStalemate()) {
			statusText = 'Stalemate!';
		} else if (game.isCheck()) {
			statusText = `Check! ${game.turn() === 'w' ? 'White' : 'Black'} to move`;
		} else {
			statusText = `${game.turn() === 'w' ? 'White' : 'Black'} to move`;
		}

		setStatus(statusText);
	};

	const getPieceSymbol = (piece) => {
		if (!piece) return '';

		const symbols = {
			'p': '♟',
			'r': '♜',
			'n': '♞',
			'b': '♝',
			'q': '♛',
			'k': '♚',
			'P': '♙',
			'R': '♖',
			'N': '♘',
			'B': '♗',
			'Q': '♕',
			'K': '♔'
		};

		const key = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
		return symbols[key] || '';
	};

	const getSquareName = (row, col) => {
		const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
		return files[col] + ranks[row];
	};

	const handleSquareClick = (row, col) => {
		const squareName = getSquareName(row, col);
		const piece = board[row][col];

		if (selectedSquare) {
			// Try to make a move
			const from = selectedSquare;
			const to = squareName;

			try {
				// Check if it's a pawn promotion
				const moves = game.moves({ square: from, verbose: true });
				const move = moves.find(m => m.to === to);

				if (move && move.flags.includes('p')) {
					// Promotion - default to queen
					game.move({ from, to, promotion: 'q' });
				} else {
					game.move({ from, to });
				}

				setBoard(game.board());
				setMoveHistory(game.history());
				setSelectedSquare(null);
				setPossibleMoves([]);
			} catch (error) {
				// Invalid move, try selecting this square instead
				if (piece && piece.color === game.turn()) {
					setSelectedSquare(squareName);
					const moves = game.moves({ square: squareName, verbose: true });
					setPossibleMoves(moves.map(m => m.to));
				} else {
					setSelectedSquare(null);
					setPossibleMoves([]);
				}
			}
		} else {
			// Select a square
			if (piece && piece.color === game.turn()) {
				setSelectedSquare(squareName);
				const moves = game.moves({ square: squareName, verbose: true });
				setPossibleMoves(moves.map(m => m.to));
			}
		}
	};

	const resetGame = () => {
		const newGame = new Chess();
		setGame(newGame);
		setBoard(newGame.board());
		setSelectedSquare(null);
		setPossibleMoves([]);
		setMoveHistory([]);
	};

	const undoMove = () => {
		game.undo();
		setBoard(game.board());
		setMoveHistory(game.history());
		setSelectedSquare(null);
		setPossibleMoves([]);
	};

	const isSquareHighlighted = (row, col) => {
		const squareName = getSquareName(row, col);
		return selectedSquare === squareName || possibleMoves.includes(squareName);
	};

	return (
		<div className="chess-game-container">
			<h1 className="chess-title">Chess Game</h1>

			<div className="chess-content">
				<div className="chess-board-wrapper">
					<div className="chess-board">
						{board.map((row, rowIndex) => (
							<div key={rowIndex} className="chess-row">
								{row.map((piece, colIndex) => {
									const isLight = (rowIndex + colIndex) % 2 === 0;
									const isHighlighted = isSquareHighlighted(rowIndex, colIndex);
									const squareName = getSquareName(rowIndex, colIndex);
									const isPossibleMove = possibleMoves.includes(squareName);

									return (
										<div
											key={colIndex}
											className={`chess-square ${isLight ? 'light' : 'dark'} ${isHighlighted ? 'highlighted' : ''} ${isPossibleMove ? 'possible-move' : ''}`}
											onClick={() => handleSquareClick(rowIndex, colIndex)}
										>
											{piece && (
												<span className={`chess-piece ${piece.color === 'w' ? 'white' : 'black'}`}>
													{getPieceSymbol(piece)}
												</span>
											)}
										</div>
									);
								})}
							</div>
						))}
					</div>
				</div>

				<div className="chess-sidebar">
					<div className="chess-status">
						<h3>Status</h3>
						<p>{status}</p>
					</div>

					<div className="chess-controls">
						<button className="chess-button" onClick={resetGame}>
							New Game
						</button>
						<button
							className="chess-button"
							onClick={undoMove}
							disabled={moveHistory.length === 0}
						>
							Undo Move
						</button>
					</div>

					<div className="chess-history">
						<h3>Move History</h3>
						<div className="move-list">
							{moveHistory.map((move, index) => (
								<div key={index} className="move-item">
									{Math.floor(index / 2) + 1}. {index % 2 === 0 ? move : `... ${move}`}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChessGame;
