import React, { useState } from 'react';

const pieceNames = {
	K: 'King',
	Q: 'Queen',
	R: 'Rook',
	B: 'Bishop',
	N: 'Knight',
	P: 'Pawn',
};

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const createInitialBoard = () => ([
	['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
	['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
	['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
]);

const inBounds = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

const toAlgebraic = (row, col) => `${files[col]}${8 - row}`;

const cloneBoard = (board) => board.map((row) => row.slice());

const getLegalMoves = (board, from, currentPlayer) => {
	const piece = board[from.row][from.col];
	if (!piece || piece[0] !== currentPlayer) {
		return [];
	}

	const color = piece[0];
	const type = piece[1];
	const opponent = color === 'w' ? 'b' : 'w';
	const moves = [];

	const addMove = (row, col) => {
		if (inBounds(row, col)) {
			moves.push({ row, col });
		}
	};

	const collectRayMoves = (directions) => {
		directions.forEach(([rowDelta, colDelta]) => {
			let row = from.row + rowDelta;
			let col = from.col + colDelta;

			while (inBounds(row, col)) {
				const target = board[row][col];
				if (!target) {
					addMove(row, col);
				} else {
					if (target[0] === opponent) {
						addMove(row, col);
					}
					break;
				}
				row += rowDelta;
				col += colDelta;
			}
		});
	};

	if (type === 'P') {
		const direction = color === 'w' ? -1 : 1;
		const startRow = color === 'w' ? 6 : 1;
		const oneStepRow = from.row + direction;

		if (inBounds(oneStepRow, from.col) && !board[oneStepRow][from.col]) {
			addMove(oneStepRow, from.col);
			const twoStepRow = from.row + direction * 2;
			if (from.row === startRow && !board[twoStepRow][from.col]) {
				addMove(twoStepRow, from.col);
			}
		}

		[-1, 1].forEach((colDelta) => {
			const row = from.row + direction;
			const col = from.col + colDelta;
			if (inBounds(row, col) && board[row][col] && board[row][col][0] === opponent) {
				addMove(row, col);
			}
		});
	}

	if (type === 'N') {
		[
			[2, 1],
			[2, -1],
			[-2, 1],
			[-2, -1],
			[1, 2],
			[1, -2],
			[-1, 2],
			[-1, -2],
		].forEach(([rowDelta, colDelta]) => {
			const row = from.row + rowDelta;
			const col = from.col + colDelta;
			if (!inBounds(row, col)) {
				return;
			}
			const target = board[row][col];
			if (!target || target[0] === opponent) {
				addMove(row, col);
			}
		});
	}

	if (type === 'B') {
		collectRayMoves([
			[1, 1],
			[1, -1],
			[-1, 1],
			[-1, -1],
		]);
	}

	if (type === 'R') {
		collectRayMoves([
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		]);
	}

	if (type === 'Q') {
		collectRayMoves([
			[1, 1],
			[1, -1],
			[-1, 1],
			[-1, -1],
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		]);
	}

	if (type === 'K') {
		[
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
			[1, 1],
			[1, -1],
			[-1, 1],
			[-1, -1],
		].forEach(([rowDelta, colDelta]) => {
			const row = from.row + rowDelta;
			const col = from.col + colDelta;
			if (!inBounds(row, col)) {
				return;
			}
			const target = board[row][col];
			if (!target || target[0] === opponent) {
				addMove(row, col);
			}
		});
	}

	return moves;
};

const buildMoveText = (piece, from, to, captured, promoted) => {
	const playerName = piece[0] === 'w' ? 'White' : 'Black';
	const pieceName = pieceNames[piece[1]];
	const captureMarker = captured ? 'x' : '-';
	const promotionText = promoted ? ' (promoted)' : '';

	return `${playerName}: ${pieceName} ${toAlgebraic(from.row, from.col)} ${captureMarker} ${toAlgebraic(to.row, to.col)}${promotionText}`;
};

const ChessGame = () => {
	const [board, setBoard] = useState(createInitialBoard);
	const [currentPlayer, setCurrentPlayer] = useState('w');
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [legalMoves, setLegalMoves] = useState([]);
	const [moveHistory, setMoveHistory] = useState([]);

	const handleReset = () => {
		setBoard(createInitialBoard());
		setCurrentPlayer('w');
		setSelectedSquare(null);
		setLegalMoves([]);
		setMoveHistory([]);
	};

	const handleSquareClick = (row, col) => {
		const piece = board[row][col];

		if (!selectedSquare) {
			if (piece && piece[0] === currentPlayer) {
				setSelectedSquare({ row, col });
				setLegalMoves(getLegalMoves(board, { row, col }, currentPlayer));
			}
			return;
		}

		const isSameSquare = selectedSquare.row === row && selectedSquare.col === col;
		if (isSameSquare) {
			setSelectedSquare(null);
			setLegalMoves([]);
			return;
		}

		if (piece && piece[0] === currentPlayer) {
			setSelectedSquare({ row, col });
			setLegalMoves(getLegalMoves(board, { row, col }, currentPlayer));
			return;
		}

		const isLegalMove = legalMoves.some((move) => move.row === row && move.col === col);
		if (!isLegalMove) {
			return;
		}

		const nextBoard = cloneBoard(board);
		const movingPiece = nextBoard[selectedSquare.row][selectedSquare.col];
		const capturedPiece = nextBoard[row][col];

		nextBoard[selectedSquare.row][selectedSquare.col] = null;
		let placedPiece = movingPiece;
		const isPromotion = movingPiece[1] === 'P' && (row === 0 || row === 7);
		if (isPromotion) {
			placedPiece = `${movingPiece[0]}Q`;
		}
		nextBoard[row][col] = placedPiece;

		setBoard(nextBoard);
		setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
		setSelectedSquare(null);
		setLegalMoves([]);
		setMoveHistory((prev) => [
			...prev,
			buildMoveText(movingPiece, selectedSquare, { row, col }, capturedPiece, isPromotion),
		]);
	};

	const isLegalDestination = (row, col) =>
		legalMoves.some((move) => move.row === row && move.col === col);

	return (
		<div className='chess-page'>
			<div className='chess-panel'>
				<h2 className='chess-title'>Chess Game</h2>
				<p className='chess-subtitle'>
					Take turns moving pieces. Basic moves are enforced; no castling, en passant, or check validation.
				</p>
				<div className='chess-status'>
					<span className='chess-status-label'>Turn</span>
					<span className='chess-status-value'>
						{currentPlayer === 'w' ? 'White' : 'Black'}
					</span>
				</div>
				<button type='button' className='reset-button' onClick={handleReset}>
					Reset game
				</button>
				<div className='move-history'>
					<div className='move-history-title'>Move history</div>
					{moveHistory.length === 0 ? (
						<div className='move-history-empty'>No moves yet.</div>
					) : (
						<ol className='move-history-list'>
							{moveHistory.map((move, index) => (
								<li key={`${move}-${index}`}>{move}</li>
							))}
						</ol>
					)}
				</div>
			</div>

			<div className='chess-board' role='grid' aria-label='Chess board'>
				{board.map((rowData, rowIndex) =>
					rowData.map((piece, colIndex) => {
						const isDark = (rowIndex + colIndex) % 2 === 1;
						const isSelected =
							selectedSquare &&
							selectedSquare.row === rowIndex &&
							selectedSquare.col === colIndex;
						const showLegal = isLegalDestination(rowIndex, colIndex);
						const pieceColor = piece ? (piece[0] === 'w' ? 'white' : 'black') : '';
						const pieceLabel = piece ? piece[1] : '';

						return (
							<button
								type='button'
								key={`${rowIndex}-${colIndex}`}
								className={`chess-square ${isDark ? 'dark' : 'light'} ${
									isSelected ? 'selected' : ''
								} ${showLegal ? 'legal' : ''}`}
								onClick={() => handleSquareClick(rowIndex, colIndex)}
								aria-label={`Square ${toAlgebraic(rowIndex, colIndex)}`}
							>
								{piece ? (
									<span className={`piece ${pieceColor}`}>{pieceLabel}</span>
								) : null}
							</button>
						);
					})
				)}
			</div>
		</div>
	);
};

export default ChessGame;
