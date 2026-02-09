import React, { useState } from 'react';
import '../Chess.css';

const ChessGame = () => {
	const [board, setBoard] = useState(initializeBoard());
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [currentPlayer, setCurrentPlayer] = useState('white');
	const [gameStatus, setGameStatus] = useState('');

	function initializeBoard() {
		const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
		
		// Set up black pieces
		newBoard[0] = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
		newBoard[1] = Array(8).fill('♟');
		
		// Set up white pieces
		newBoard[6] = Array(8).fill('♙');
		newBoard[7] = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
		
		return newBoard;
	}

	function getPieceColor(piece) {
		if (!piece) return null;
		const whitePieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
		return whitePieces.includes(piece) ? 'white' : 'black';
	}

	function isValidMove(fromRow, fromCol, toRow, toCol) {
		const piece = board[fromRow][fromCol];
		const targetPiece = board[toRow][toCol];
		
		// Can't capture own piece
		if (targetPiece && getPieceColor(piece) === getPieceColor(targetPiece)) {
			return false;
		}

		const rowDiff = Math.abs(toRow - fromRow);
		const colDiff = Math.abs(toCol - fromCol);

		// Pawn movement
		if (piece === '♙' || piece === '♟') {
			const direction = piece === '♙' ? -1 : 1;
			const startRow = piece === '♙' ? 6 : 1;
			
			// Move forward
			if (fromCol === toCol && !targetPiece) {
				if (toRow === fromRow + direction) return true;
				if (fromRow === startRow && toRow === fromRow + 2 * direction && 
					!board[fromRow + direction][fromCol]) return true;
			}
			
			// Capture diagonally
			if (colDiff === 1 && toRow === fromRow + direction && targetPiece) {
				return true;
			}
			return false;
		}

		// Rook movement
		if (piece === '♖' || piece === '♜') {
			if (fromRow !== toRow && fromCol !== toCol) return false;
			return isPathClear(fromRow, fromCol, toRow, toCol);
		}

		// Knight movement
		if (piece === '♘' || piece === '♞') {
			return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
		}

		// Bishop movement
		if (piece === '♗' || piece === '♝') {
			if (rowDiff !== colDiff) return false;
			return isPathClear(fromRow, fromCol, toRow, toCol);
		}

		// Queen movement
		if (piece === '♕' || piece === '♛') {
			if (fromRow !== toRow && fromCol !== toCol && rowDiff !== colDiff) return false;
			return isPathClear(fromRow, fromCol, toRow, toCol);
		}

		// King movement
		if (piece === '♔' || piece === '♚') {
			return rowDiff <= 1 && colDiff <= 1;
		}

		return false;
	}

	function isPathClear(fromRow, fromCol, toRow, toCol) {
		const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
		const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
		
		let currentRow = fromRow + rowStep;
		let currentCol = fromCol + colStep;
		
		while (currentRow !== toRow || currentCol !== toCol) {
			if (board[currentRow][currentCol]) return false;
			currentRow += rowStep;
			currentCol += colStep;
		}
		
		return true;
	}

	function handleSquareClick(row, col) {
		if (selectedSquare) {
			const [fromRow, fromCol] = selectedSquare;
			const piece = board[fromRow][fromCol];
			
			if (getPieceColor(piece) !== currentPlayer) {
				setSelectedSquare(null);
				return;
			}

			if (isValidMove(fromRow, fromCol, row, col)) {
				const newBoard = board.map(r => [...r]);
				newBoard[row][col] = piece;
				newBoard[fromRow][fromCol] = null;
				
				// Check if king was captured
				if (board[row][col] === '♔') {
					setGameStatus('Black wins!');
				} else if (board[row][col] === '♚') {
					setGameStatus('White wins!');
				}
				
				setBoard(newBoard);
				setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
				setSelectedSquare(null);
			} else {
				// Try to select new piece
				const clickedPiece = board[row][col];
				if (clickedPiece && getPieceColor(clickedPiece) === currentPlayer) {
					setSelectedSquare([row, col]);
				} else {
					setSelectedSquare(null);
				}
			}
		} else {
			const piece = board[row][col];
			if (piece && getPieceColor(piece) === currentPlayer) {
				setSelectedSquare([row, col]);
			}
		}
	}

	function resetGame() {
		setBoard(initializeBoard());
		setSelectedSquare(null);
		setCurrentPlayer('white');
		setGameStatus('');
	}

	return (
		<div className="chess-container">
			<h1>Chess Game</h1>
			<div className="game-info">
				<p>Current Player: <strong>{currentPlayer.toUpperCase()}</strong></p>
				{gameStatus && <p className="game-status">{gameStatus}</p>}
			</div>
			<div className="chessboard">
				{board.map((row, rowIndex) => (
					<div key={rowIndex} className="board-row">
						{row.map((piece, colIndex) => {
							const isLight = (rowIndex + colIndex) % 2 === 0;
							const isSelected = selectedSquare && 
								selectedSquare[0] === rowIndex && 
								selectedSquare[1] === colIndex;
							
							return (
								<div
									key={`${rowIndex}-${colIndex}`}
									className={`square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''}`}
									onClick={() => handleSquareClick(rowIndex, colIndex)}
								>
									{piece && <span className="piece">{piece}</span>}
								</div>
							);
						})}
					</div>
				))}
			</div>
			<button className="reset-button" onClick={resetGame}>Reset Game</button>
		</div>
	);
};

export default ChessGame;
