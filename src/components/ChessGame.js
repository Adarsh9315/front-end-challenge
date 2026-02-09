import React, { useState } from 'react';
import '../ChessGame.css';

const ChessGame = () => {
	const [board, setBoard] = useState(initializeBoard());
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [currentPlayer, setCurrentPlayer] = useState('white');
	const [gameStatus, setGameStatus] = useState('');
	const [moveHistory, setMoveHistory] = useState([]);

	function initializeBoard() {
		const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));

		// Place pawns
		for (let i = 0; i < 8; i++) {
			newBoard[1][i] = { type: 'pawn', color: 'black' };
			newBoard[6][i] = { type: 'pawn', color: 'white' };
		}

		// Place rooks
		newBoard[0][0] = { type: 'rook', color: 'black' };
		newBoard[0][7] = { type: 'rook', color: 'black' };
		newBoard[7][0] = { type: 'rook', color: 'white' };
		newBoard[7][7] = { type: 'rook', color: 'white' };

		// Place knights
		newBoard[0][1] = { type: 'knight', color: 'black' };
		newBoard[0][6] = { type: 'knight', color: 'black' };
		newBoard[7][1] = { type: 'knight', color: 'white' };
		newBoard[7][6] = { type: 'knight', color: 'white' };

		// Place bishops
		newBoard[0][2] = { type: 'bishop', color: 'black' };
		newBoard[0][5] = { type: 'bishop', color: 'black' };
		newBoard[7][2] = { type: 'bishop', color: 'white' };
		newBoard[7][5] = { type: 'bishop', color: 'white' };

		// Place queens
		newBoard[0][3] = { type: 'queen', color: 'black' };
		newBoard[7][3] = { type: 'queen', color: 'white' };

		// Place kings
		newBoard[0][4] = { type: 'king', color: 'black' };
		newBoard[7][4] = { type: 'king', color: 'white' };

		return newBoard;
	}

	function getPieceSymbol(piece) {
		if (!piece) return '';

		const symbols = {
			'king': '♔',
			'queen': '♕',
			'rook': '♖',
			'bishop': '♗',
			'knight': '♘',
			'pawn': '♙'
		};

		const symbol = symbols[piece.type];
		return piece.color === 'black' ? symbol : symbol;
	}

	function isValidMove(fromRow, fromCol, toRow, toCol) {
		const piece = board[fromRow][fromCol];
		const targetPiece = board[toRow][toCol];

		// Can't capture your own piece
		if (targetPiece && targetPiece.color === piece.color) {
			return false;
		}

		const rowDiff = Math.abs(toRow - fromRow);
		const colDiff = Math.abs(toCol - fromCol);

		switch (piece.type) {
			case 'pawn':
				const direction = piece.color === 'white' ? -1 : 1;
				const startRow = piece.color === 'white' ? 6 : 1;

				// Move forward
				if (fromCol === toCol && !targetPiece) {
					if (toRow === fromRow + direction) return true;
					if (fromRow === startRow && toRow === fromRow + 2 * direction && !board[fromRow + direction][fromCol]) return true;
				}

				// Capture diagonally
				if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction && targetPiece) {
					return true;
				}
				return false;

			case 'rook':
				if (fromRow === toRow || fromCol === toCol) {
					return isPathClear(fromRow, fromCol, toRow, toCol);
				}
				return false;

			case 'knight':
				return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

			case 'bishop':
				if (rowDiff === colDiff) {
					return isPathClear(fromRow, fromCol, toRow, toCol);
				}
				return false;

			case 'queen':
				if (fromRow === toRow || fromCol === toCol || rowDiff === colDiff) {
					return isPathClear(fromRow, fromCol, toRow, toCol);
				}
				return false;

			case 'king':
				return rowDiff <= 1 && colDiff <= 1;

			default:
				return false;
		}
	}

	function isPathClear(fromRow, fromCol, toRow, toCol) {
		const rowDir = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
		const colDir = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;

		let currentRow = fromRow + rowDir;
		let currentCol = fromCol + colDir;

		while (currentRow !== toRow || currentCol !== toCol) {
			if (board[currentRow][currentCol]) return false;
			currentRow += rowDir;
			currentCol += colDir;
		}

		return true;
	}

	function handleSquareClick(row, col) {
		if (selectedSquare) {
			const [selectedRow, selectedCol] = selectedSquare;
			const piece = board[selectedRow][selectedCol];

			if (piece && piece.color === currentPlayer && isValidMove(selectedRow, selectedCol, row, col)) {
				const newBoard = board.map(r => [...r]);
				const capturedPiece = newBoard[row][col];

				newBoard[row][col] = piece;
				newBoard[selectedRow][selectedCol] = null;

				setBoard(newBoard);

				// Add to move history
				const move = `${piece.color} ${piece.type} from ${String.fromCharCode(97 + selectedCol)}${8 - selectedRow} to ${String.fromCharCode(97 + col)}${8 - row}`;
				setMoveHistory([...moveHistory, move]);

				// Check for king capture (simple win condition)
				if (capturedPiece && capturedPiece.type === 'king') {
					setGameStatus(`${currentPlayer.toUpperCase()} WINS!`);
				} else {
					setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
				}
			}

			setSelectedSquare(null);
		} else {
			const piece = board[row][col];
			if (piece && piece.color === currentPlayer) {
				setSelectedSquare([row, col]);
			}
		}
	}

	function resetGame() {
		setBoard(initializeBoard());
		setSelectedSquare(null);
		setCurrentPlayer('white');
		setGameStatus('');
		setMoveHistory([]);
	}

	return (
		<div className="chess-container">
			<div className="chess-header">
				<h1>Chess Game</h1>
				<div className="game-info">
					<p>Current Player: <span className={currentPlayer}>{currentPlayer.toUpperCase()}</span></p>
					{gameStatus && <p className="game-status">{gameStatus}</p>}
				</div>
				<button className="reset-btn" onClick={resetGame}>New Game</button>
			</div>

			<div className="chess-board-wrapper">
				<div className="chess-board">
					{board.map((row, rowIndex) => (
						row.map((piece, colIndex) => {
							const isLight = (rowIndex + colIndex) % 2 === 0;
							const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex;

							return (
								<div
									key={`${rowIndex}-${colIndex}`}
									className={`chess-square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''}`}
									onClick={() => handleSquareClick(rowIndex, colIndex)}
								>
									{piece && (
										<div className={`chess-piece ${piece.color}`}>
											{getPieceSymbol(piece)}
										</div>
									)}
									{rowIndex === 7 && (
										<span className="coord-file">{String.fromCharCode(97 + colIndex)}</span>
									)}
									{colIndex === 0 && (
										<span className="coord-rank">{8 - rowIndex}</span>
									)}
								</div>
							);
						})
					))}
				</div>

				<div className="move-history">
					<h3>Move History</h3>
					<div className="moves-list">
						{moveHistory.length === 0 ? (
							<p className="no-moves">No moves yet</p>
						) : (
							moveHistory.map((move, index) => (
								<div key={index} className="move-item">
									{index + 1}. {move}
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChessGame;
