import React, { useState } from 'react';

const FILES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const createInitialBoard = () => ([
	['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
	['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
	['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]);

const isWhitePiece = (piece) => piece && piece === piece.toUpperCase();

const formatSquare = (row, col) => `${FILES[col]}${8 - row}`;

const ChessGamePage = () => {
	const [board, setBoard] = useState(createInitialBoard);
	const [selected, setSelected] = useState(null);
	const [turn, setTurn] = useState('white');
	const [moveHistory, setMoveHistory] = useState([]);

	const handleSquareClick = (row, col) => {
		const currentPiece = board[row][col];

		if (selected) {
			const selectedPiece = board[selected.row][selected.col];
			if (!selectedPiece) {
				setSelected(null);
				return;
			}

			if (selected.row === row && selected.col === col) {
				setSelected(null);
				return;
			}

			const nextBoard = board.map((boardRow) => boardRow.slice());
			nextBoard[row][col] = selectedPiece;
			nextBoard[selected.row][selected.col] = null;

			setBoard(nextBoard);
			setSelected(null);
			setTurn(turn === 'white' ? 'black' : 'white');
			setMoveHistory((history) => [
				...history,
				`${formatSquare(selected.row, selected.col)} -> ${formatSquare(row, col)}`
			]);
			return;
		}

		if (!currentPiece) {
			return;
		}

		const isWhiteTurn = turn === 'white';
		if ((isWhiteTurn && isWhitePiece(currentPiece)) || (!isWhiteTurn && !isWhitePiece(currentPiece))) {
			setSelected({ row, col });
		}
	};

	const handleReset = () => {
		setBoard(createInitialBoard());
		setSelected(null);
		setTurn('white');
		setMoveHistory([]);
	};

	return (
		<div className='chess-page'>
			<div className='chess-header'>
				<h2 className='chess-title'>Chess Game</h2>
				<p className='chess-subtitle'>
					Uppercase pieces are White, lowercase pieces are Black. Click a piece, then a
					square to move. No rule validation is enforced.
				</p>
			</div>
			<div className='chess-content'>
				<div className='chess-board' role='grid' aria-label='Chess board'>
					{board.map((boardRow, rowIndex) => (
						boardRow.map((piece, colIndex) => {
							const isDark = (rowIndex + colIndex) % 2 === 1;
							const isSelected = selected
								&& selected.row === rowIndex
								&& selected.col === colIndex;
							const pieceClass = piece
								? (isWhitePiece(piece) ? 'piece-white' : 'piece-black')
								: '';

							return (
								<button
									key={`${rowIndex}-${colIndex}`}
									type='button'
									className={`chess-square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`}
									onClick={() => handleSquareClick(rowIndex, colIndex)}
									aria-label={`${formatSquare(rowIndex, colIndex)} ${piece ? `piece ${piece}` : 'empty'}`}
								>
									<span className={`chess-piece ${pieceClass}`}>
										{piece || ''}
									</span>
								</button>
							);
						})
					))}
				</div>
				<div className='chess-panel'>
					<div className='chess-status'>
						Turn: <span className='chess-turn'>{turn === 'white' ? 'White' : 'Black'}</span>
					</div>
					<button type='button' className='btn btn-outline-light btn-sm chess-reset' onClick={handleReset}>
						Reset Board
					</button>
					<div className='chess-moves'>
						<h4>Moves</h4>
						{moveHistory.length ? (
							<ol className='chess-move-list'>
								{moveHistory.map((move, index) => (
									<li key={`${move}-${index}`}>{move}</li>
								))}
							</ol>
						) : (
							<p className='chess-empty'>No moves yet. Start by selecting a piece.</p>
						)}
					</div>
					<div className='chess-legend'>
						<div>Pieces: K Q R B N P</div>
						<div>Files: A-H</div>
						<div>Ranks: 8-1</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChessGamePage;
