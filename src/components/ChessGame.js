import React, { useState, useEffect } from 'react';
import '../ChessGame.css';

const ChessGame = () => {
	const [board, setBoard] = useState([]);
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [currentPlayer, setCurrentPlayer] = useState('white');
	const [validMoves, setValidMoves] = useState([]);
	const [gameStatus, setGameStatus] = useState('');

	// Initialize the chess board
	useEffect(() => {
		initializeBoard();
	}, []);

	const initializeBoard = () => {
		const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));

		// Set up black pieces
		newBoard[0] = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
		newBoard[1] = Array(8).fill('♟');

		// Set up white pieces
		newBoard[6] = Array(8).fill('♙');
		newBoard[7] = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];

		setBoard(newBoard);
		setGameStatus(`${currentPlayer.toUpperCase()}'s turn`);
	};

	const isPieceColor = (piece, color) => {
		if (!piece) return false;
		const whitePieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
		const blackPieces = ['♚', '♛', '♜', '♝', '♞', '♟'];
		return color === 'white' ? whitePieces.includes(piece) : blackPieces.includes(piece);
	};

	const getValidMoves = (row, col, piece) => {
		const moves = [];
		const pieceType = getPieceType(piece);
		const isWhite = isPieceColor(piece, 'white');
		const direction = isWhite ? -1 : 1;

		switch (pieceType) {
			case 'pawn':
				// Move forward one square
				if (board[row + direction]?.[col] === null) {
					moves.push([row + direction, col]);
					// Move forward two squares from starting position
					const startRow = isWhite ? 6 : 1;
					if (row === startRow && board[row + direction * 2]?.[col] === null) {
						moves.push([row + direction * 2, col]);
					}
				}
				// Capture diagonally
				[-1, 1].forEach(offset => {
					const newCol = col + offset;
					if (board[row + direction]?.[newCol] &&
						isPieceColor(board[row + direction][newCol], isWhite ? 'black' : 'white')) {
						moves.push([row + direction, newCol]);
					}
				});
				break;

			case 'rook':
				addLinearMoves(row, col, moves, [[0, 1], [0, -1], [1, 0], [-1, 0]], isWhite);
				break;

			case 'knight':
				const knightMoves = [
					[-2, -1], [-2, 1], [-1, -2], [-1, 2],
					[1, -2], [1, 2], [2, -1], [2, 1]
				];
				knightMoves.forEach(([dRow, dCol]) => {
					const newRow = row + dRow;
					const newCol = col + dCol;
					if (isValidSquare(newRow, newCol) &&
						(!board[newRow][newCol] || isPieceColor(board[newRow][newCol], isWhite ? 'black' : 'white'))) {
						moves.push([newRow, newCol]);
					}
				});
				break;

			case 'bishop':
				addLinearMoves(row, col, moves, [[1, 1], [1, -1], [-1, 1], [-1, -1]], isWhite);
				break;

			case 'queen':
				addLinearMoves(row, col, moves, [
					[0, 1], [0, -1], [1, 0], [-1, 0],
					[1, 1], [1, -1], [-1, 1], [-1, -1]
				], isWhite);
				break;

			case 'king':
				const kingMoves = [
					[-1, -1], [-1, 0], [-1, 1],
					[0, -1], [0, 1],
					[1, -1], [1, 0], [1, 1]
				];
				kingMoves.forEach(([dRow, dCol]) => {
					const newRow = row + dRow;
					const newCol = col + dCol;
					if (isValidSquare(newRow, newCol) &&
						(!board[newRow][newCol] || isPieceColor(board[newRow][newCol], isWhite ? 'black' : 'white'))) {
						moves.push([newRow, newCol]);
					}
				});
				break;

			default:
				break;
		}

		return moves;
	};

	const addLinearMoves = (row, col, moves, directions, isWhite) => {
		directions.forEach(([dRow, dCol]) => {
			let newRow = row + dRow;
			let newCol = col + dCol;
			while (isValidSquare(newRow, newCol)) {
				if (board[newRow][newCol] === null) {
					moves.push([newRow, newCol]);
				} else {
					if (isPieceColor(board[newRow][newCol], isWhite ? 'black' : 'white')) {
						moves.push([newRow, newCol]);
					}
					break;
				}
				newRow += dRow;
				newCol += dCol;
			}
		});
	};

	const isValidSquare = (row, col) => {
		return row >= 0 && row < 8 && col >= 0 && col < 8;
	};

	const getPieceType = (piece) => {
		const pieces = {
			'♔': 'king', '♕': 'queen', '♖': 'rook', '♗': 'bishop', '♘': 'knight', '♙': 'pawn',
			'♚': 'king', '♛': 'queen', '♜': 'rook', '♝': 'bishop', '♞': 'knight', '♟': 'pawn'
		};
		return pieces[piece] || '';
	};

	const handleSquareClick = (row, col) => {
		const piece = board[row][col];

		// If a piece is already selected
		if (selectedSquare) {
			const [selectedRow, selectedCol] = selectedSquare;
			const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

			if (isValidMove) {
				// Make the move
				const newBoard = board.map(row => [...row]);
				newBoard[row][col] = board[selectedRow][selectedCol];
				newBoard[selectedRow][selectedCol] = null;

				setBoard(newBoard);
				setSelectedSquare(null);
				setValidMoves([]);

				// Switch player
				const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
				setCurrentPlayer(nextPlayer);
				setGameStatus(`${nextPlayer.toUpperCase()}'s turn`);
			} else if (piece && isPieceColor(piece, currentPlayer)) {
				// Select a different piece of the same color
				setSelectedSquare([row, col]);
				setValidMoves(getValidMoves(row, col, piece));
			} else {
				// Deselect
				setSelectedSquare(null);
				setValidMoves([]);
			}
		} else {
			// Select a piece
			if (piece && isPieceColor(piece, currentPlayer)) {
				setSelectedSquare([row, col]);
				setValidMoves(getValidMoves(row, col, piece));
			}
		}
	};

	const resetGame = () => {
		initializeBoard();
		setSelectedSquare(null);
		setValidMoves([]);
		setCurrentPlayer('white');
	};

	const isValidMoveSquare = (row, col) => {
		return validMoves.some(([r, c]) => r === row && c === col);
	};

	return (
		<div className="chess-game-container">
			<h1 className="chess-title">Chess Game</h1>
			<div className="game-status">{gameStatus}</div>

			<div className="chess-board">
				{board.map((row, rowIndex) => (
					<div key={rowIndex} className="chess-row">
						{row.map((piece, colIndex) => {
							const isLight = (rowIndex + colIndex) % 2 === 0;
							const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex;
							const isValidMove = isValidMoveSquare(rowIndex, colIndex);

							return (
								<div
									key={colIndex}
									className={`chess-square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
									onClick={() => handleSquareClick(rowIndex, colIndex)}
								>
									{piece && <span className="chess-piece">{piece}</span>}
								</div>
							);
						})}
					</div>
				))}
			</div>

			<button className="reset-btn" onClick={resetGame}>
				New Game
			</button>

			<div className="chess-instructions">
				<h3>How to Play:</h3>
				<ul>
					<li>Click on a piece to select it</li>
					<li>Valid moves will be highlighted</li>
					<li>Click on a highlighted square to move</li>
					<li>Players alternate turns (White starts first)</li>
				</ul>
			</div>
		</div>
	);
};

export default ChessGame;
