import React, { useState, useCallback } from 'react';
import './ChessGame.css';

const PIECE_SYMBOLS = {
	white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
	black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' },
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

function createPiece(type, color) {
	return { type, color };
}

function getInitialBoard() {
	const board = Array(8).fill(null).map(() => Array(8).fill(null));

	const backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
	for (let col = 0; col < 8; col++) {
		board[0][col] = createPiece(backRow[col], 'black');
		board[1][col] = createPiece('pawn', 'black');
		board[6][col] = createPiece('pawn', 'white');
		board[7][col] = createPiece(backRow[col], 'white');
	}

	return board;
}

function cloneBoard(board) {
	return board.map(row => row.map(cell => (cell ? { ...cell } : null)));
}

function isInBounds(row, col) {
	return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function findKing(board, color) {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.type === 'king' && piece.color === color) {
				return { row: r, col: c };
			}
		}
	}
	return null;
}

function isSquareAttackedBy(board, row, col, attackerColor) {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.color === attackerColor) {
				const attacks = getRawMoves(board, r, c, true);
				if (attacks.some(m => m.row === row && m.col === col)) {
					return true;
				}
			}
		}
	}
	return false;
}

function isKingInCheck(board, color) {
	const king = findKing(board, color);
	if (!king) return false;
	const opponent = color === 'white' ? 'black' : 'white';
	return isSquareAttackedBy(board, king.row, king.col, opponent);
}

function getRawMoves(board, row, col, attackOnly) {
	const piece = board[row][col];
	if (!piece) return [];

	const moves = [];
	const { type, color } = piece;
	const opponent = color === 'white' ? 'black' : 'white';

	const addIfValid = (r, c) => {
		if (!isInBounds(r, c)) return false;
		const target = board[r][c];
		if (!target) {
			moves.push({ row: r, col: c });
			return true;
		}
		if (target.color === opponent) {
			moves.push({ row: r, col: c });
		}
		return false;
	};

	const addSliding = (directions) => {
		for (const [dr, dc] of directions) {
			for (let i = 1; i < 8; i++) {
				const r = row + dr * i;
				const c = col + dc * i;
				if (!isInBounds(r, c)) break;
				const target = board[r][c];
				if (!target) {
					moves.push({ row: r, col: c });
				} else {
					if (target.color === opponent) {
						moves.push({ row: r, col: c });
					}
					break;
				}
			}
		}
	};

	switch (type) {
		case 'pawn': {
			const dir = color === 'white' ? -1 : 1;
			const startRow = color === 'white' ? 6 : 1;

			if (!attackOnly) {
				const oneAhead = row + dir;
				if (isInBounds(oneAhead, col) && !board[oneAhead][col]) {
					moves.push({ row: oneAhead, col });
					const twoAhead = row + dir * 2;
					if (row === startRow && isInBounds(twoAhead, col) && !board[twoAhead][col]) {
						moves.push({ row: twoAhead, col });
					}
				}
			}

			for (const dc of [-1, 1]) {
				const r = row + dir;
				const c = col + dc;
				if (isInBounds(r, c)) {
					if (attackOnly) {
						moves.push({ row: r, col: c });
					} else if (board[r][c] && board[r][c].color === opponent) {
						moves.push({ row: r, col: c });
					}
				}
			}
			break;
		}
		case 'knight': {
			const knightMoves = [
				[-2, -1], [-2, 1], [-1, -2], [-1, 2],
				[1, -2], [1, 2], [2, -1], [2, 1],
			];
			for (const [dr, dc] of knightMoves) {
				addIfValid(row + dr, col + dc);
			}
			break;
		}
		case 'bishop':
			addSliding([[-1, -1], [-1, 1], [1, -1], [1, 1]]);
			break;
		case 'rook':
			addSliding([[-1, 0], [1, 0], [0, -1], [0, 1]]);
			break;
		case 'queen':
			addSliding([[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]);
			break;
		case 'king': {
			const kingMoves = [
				[-1, -1], [-1, 0], [-1, 1],
				[0, -1], [0, 1],
				[1, -1], [1, 0], [1, 1],
			];
			for (const [dr, dc] of kingMoves) {
				addIfValid(row + dr, col + dc);
			}
			break;
		}
		default:
			break;
	}

	return moves;
}

function getLegalMoves(board, row, col, castlingRights, enPassantTarget) {
	const piece = board[row][col];
	if (!piece) return [];

	const { color } = piece;
	let rawMoves = getRawMoves(board, row, col, false);

	// En passant for pawns
	if (piece.type === 'pawn' && enPassantTarget) {
		const dir = color === 'white' ? -1 : 1;
		for (const dc of [-1, 1]) {
			const r = row + dir;
			const c = col + dc;
			if (r === enPassantTarget.row && c === enPassantTarget.col) {
				rawMoves.push({ row: r, col: c, enPassant: true });
			}
		}
	}

	// Filter moves that leave own king in check
	const legalMoves = rawMoves.filter(move => {
		const testBoard = cloneBoard(board);
		testBoard[move.row][move.col] = testBoard[row][col];
		testBoard[row][col] = null;

		// Handle en passant capture
		if (move.enPassant) {
			const capturedPawnRow = color === 'white' ? move.row + 1 : move.row - 1;
			testBoard[capturedPawnRow][move.col] = null;
		}

		return !isKingInCheck(testBoard, color);
	});

	// Castling
	if (piece.type === 'king') {
		const homeRow = color === 'white' ? 7 : 0;
		if (row === homeRow && col === 4) {
			const opponent = color === 'white' ? 'black' : 'white';
			const rights = castlingRights[color];

			// King-side
			if (rights.kingSide) {
				const rookPiece = board[homeRow][7];
				if (
					rookPiece && rookPiece.type === 'rook' && rookPiece.color === color &&
					!board[homeRow][5] && !board[homeRow][6] &&
					!isSquareAttackedBy(board, homeRow, 4, opponent) &&
					!isSquareAttackedBy(board, homeRow, 5, opponent) &&
					!isSquareAttackedBy(board, homeRow, 6, opponent)
				) {
					legalMoves.push({ row: homeRow, col: 6, castling: 'kingSide' });
				}
			}

			// Queen-side
			if (rights.queenSide) {
				const rookPiece = board[homeRow][0];
				if (
					rookPiece && rookPiece.type === 'rook' && rookPiece.color === color &&
					!board[homeRow][1] && !board[homeRow][2] && !board[homeRow][3] &&
					!isSquareAttackedBy(board, homeRow, 4, opponent) &&
					!isSquareAttackedBy(board, homeRow, 3, opponent) &&
					!isSquareAttackedBy(board, homeRow, 2, opponent)
				) {
					legalMoves.push({ row: homeRow, col: 2, castling: 'queenSide' });
				}
			}
		}
	}

	return legalMoves;
}

function hasAnyLegalMoves(board, color, castlingRights, enPassantTarget) {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.color === color) {
				const moves = getLegalMoves(board, r, c, castlingRights, enPassantTarget);
				if (moves.length > 0) return true;
			}
		}
	}
	return false;
}

const INITIAL_CASTLING = {
	white: { kingSide: true, queenSide: true },
	black: { kingSide: true, queenSide: true },
};

const ChessGame = () => {
	const [board, setBoard] = useState(getInitialBoard);
	const [turn, setTurn] = useState('white');
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [legalMovesForSelected, setLegalMovesForSelected] = useState([]);
	const [castlingRights, setCastlingRights] = useState(INITIAL_CASTLING);
	const [enPassantTarget, setEnPassantTarget] = useState(null);
	const [gameStatus, setGameStatus] = useState('playing');
	const [lastMove, setLastMove] = useState(null);
	const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
	const [promotionPending, setPromotionPending] = useState(null);
	const [moveHistory, setMoveHistory] = useState([]);

	const resetGame = useCallback(() => {
		setBoard(getInitialBoard());
		setTurn('white');
		setSelectedSquare(null);
		setLegalMovesForSelected([]);
		setCastlingRights({
			white: { kingSide: true, queenSide: true },
			black: { kingSide: true, queenSide: true },
		});
		setEnPassantTarget(null);
		setGameStatus('playing');
		setLastMove(null);
		setCapturedPieces({ white: [], black: [] });
		setPromotionPending(null);
		setMoveHistory([]);
	}, []);

	const applyPostMove = useCallback((newBoard, fromRow, fromCol, toRow, toCol, piece, currentTurn, currentCastling, newCaptured) => {
		const newCastling = {
			white: { ...currentCastling.white },
			black: { ...currentCastling.black },
		};

		if (piece.type === 'king') {
			newCastling[currentTurn].kingSide = false;
			newCastling[currentTurn].queenSide = false;
		}
		if (piece.type === 'rook') {
			const homeRow = currentTurn === 'white' ? 7 : 0;
			if (fromRow === homeRow && fromCol === 0) newCastling[currentTurn].queenSide = false;
			if (fromRow === homeRow && fromCol === 7) newCastling[currentTurn].kingSide = false;
		}
		if (toRow === 0 && toCol === 0) newCastling.black.queenSide = false;
		if (toRow === 0 && toCol === 7) newCastling.black.kingSide = false;
		if (toRow === 7 && toCol === 0) newCastling.white.queenSide = false;
		if (toRow === 7 && toCol === 7) newCastling.white.kingSide = false;

		let newEnPassant = null;
		if (piece.type === 'pawn' && Math.abs(toRow - fromRow) === 2) {
			newEnPassant = { row: (fromRow + toRow) / 2, col: fromCol };
		}

		const nextTurn = currentTurn === 'white' ? 'black' : 'white';

		const inCheck = isKingInCheck(newBoard, nextTurn);
		const hasLegal = hasAnyLegalMoves(newBoard, nextTurn, newCastling, newEnPassant);

		let status = 'playing';
		if (inCheck && !hasLegal) {
			status = 'checkmate';
		} else if (!inCheck && !hasLegal) {
			status = 'stalemate';
		} else if (inCheck) {
			status = 'check';
		}

		setBoard(newBoard);
		setTurn(nextTurn);
		setCastlingRights(newCastling);
		setEnPassantTarget(newEnPassant);
		setGameStatus(status);
		setLastMove({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol } });
		setCapturedPieces(newCaptured);
		setSelectedSquare(null);
		setLegalMovesForSelected([]);
		setMoveHistory(prev => [...prev, {
			from: { row: fromRow, col: fromCol },
			to: { row: toRow, col: toCol },
			piece: piece.type,
			color: currentTurn,
		}]);
	}, []);

	const executeMove = useCallback((fromRow, fromCol, toRow, toCol, move, currentBoard, currentTurn, currentCastling, currentCaptured, promotionType) => {
		const newBoard = cloneBoard(currentBoard);
		const piece = newBoard[fromRow][fromCol];
		const captured = newBoard[toRow][toCol];
		const newCaptured = { ...currentCaptured, white: [...currentCaptured.white], black: [...currentCaptured.black] };

		if (captured) {
			newCaptured[captured.color].push(captured);
		}

		if (move.enPassant) {
			const capturedPawnRow = currentTurn === 'white' ? toRow + 1 : toRow - 1;
			const epCaptured = newBoard[capturedPawnRow][toCol];
			if (epCaptured) {
				newCaptured[epCaptured.color].push(epCaptured);
			}
			newBoard[capturedPawnRow][toCol] = null;
		}

		if (move.castling) {
			const homeRow = currentTurn === 'white' ? 7 : 0;
			if (move.castling === 'kingSide') {
				newBoard[homeRow][5] = newBoard[homeRow][7];
				newBoard[homeRow][7] = null;
			} else {
				newBoard[homeRow][3] = newBoard[homeRow][0];
				newBoard[homeRow][0] = null;
			}
		}

		newBoard[toRow][toCol] = piece;
		newBoard[fromRow][fromCol] = null;

		if (piece.type === 'pawn') {
			const promotionRow = currentTurn === 'white' ? 0 : 7;
			if (toRow === promotionRow) {
				if (promotionType) {
					newBoard[toRow][toCol] = createPiece(promotionType, currentTurn);
				} else {
					setPromotionPending({ row: toRow, col: toCol, fromRow, fromCol, move, board: newBoard, captured: newCaptured });
					return;
				}
			}
		}

		applyPostMove(newBoard, fromRow, fromCol, toRow, toCol, piece, currentTurn, currentCastling, newCaptured);
	}, [applyPostMove]);

	const handlePromotion = useCallback((type) => {
		if (!promotionPending) return;
		const { row, col, fromRow, fromCol, board: pendingBoard, captured } = promotionPending;
		const newBoard = cloneBoard(pendingBoard);
		newBoard[row][col] = createPiece(type, turn);

		setPromotionPending(null);
		applyPostMove(newBoard, fromRow, fromCol, row, col, { type: 'pawn', color: turn }, turn, castlingRights, captured);
	}, [promotionPending, turn, castlingRights, applyPostMove]);

	const handleSquareClick = useCallback((row, col) => {
		if (gameStatus === 'checkmate' || gameStatus === 'stalemate') return;
		if (promotionPending) return;

		const piece = board[row][col];

		if (selectedSquare) {
			// Check if clicking on a valid move
			const move = legalMovesForSelected.find(m => m.row === row && m.col === col);
			if (move) {
				executeMove(selectedSquare.row, selectedSquare.col, row, col, move, board, turn, castlingRights, capturedPieces, null);
				return;
			}

			// Clicking on own piece — reselect
			if (piece && piece.color === turn) {
				const moves = getLegalMoves(board, row, col, castlingRights, enPassantTarget);
				setSelectedSquare({ row, col });
				setLegalMovesForSelected(moves);
				return;
			}

			// Clicking elsewhere — deselect
			setSelectedSquare(null);
			setLegalMovesForSelected([]);
			return;
		}

		// No selection yet — select own piece
		if (piece && piece.color === turn) {
			const moves = getLegalMoves(board, row, col, castlingRights, enPassantTarget);
			setSelectedSquare({ row, col });
			setLegalMovesForSelected(moves);
		}
	}, [board, turn, selectedSquare, legalMovesForSelected, castlingRights, enPassantTarget, gameStatus, promotionPending, capturedPieces, executeMove]);

	const getSquareClasses = (row, col) => {
		const isLight = (row + col) % 2 === 0;
		let classes = `chess-square ${isLight ? 'light' : 'dark'}`;

		if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
			classes += ' selected';
		}

		const isValidMove = legalMovesForSelected.find(m => m.row === row && m.col === col);
		if (isValidMove) {
			const targetPiece = board[row][col];
			classes += targetPiece ? ' valid-capture' : ' valid-move';
		}

		if (lastMove) {
			if (lastMove.from.row === row && lastMove.from.col === col) {
				classes += ' last-move-from';
			}
			if (lastMove.to.row === row && lastMove.to.col === col) {
				classes += ' last-move-to';
			}
		}

		// Highlight king in check
		if (gameStatus === 'check' || gameStatus === 'checkmate') {
			const piece = board[row][col];
			if (piece && piece.type === 'king' && piece.color === turn) {
				classes += ' king-in-check';
			}
		}

		return classes;
	};

	const getStatusText = () => {
		switch (gameStatus) {
			case 'checkmate':
				const winner = turn === 'white' ? 'Black' : 'White';
				return `Checkmate! ${winner} wins!`;
			case 'stalemate':
				return 'Stalemate! Draw.';
			case 'check':
				return `${turn === 'white' ? 'White' : 'Black'} is in check!`;
			default:
				return `${turn === 'white' ? 'White' : 'Black'}'s turn`;
		}
	};

	const getStatusClass = () => {
		let cls = 'chess-status';
		if (gameStatus === 'check') cls += ' check';
		if (gameStatus === 'checkmate') cls += ' checkmate';
		if (gameStatus === 'stalemate') cls += ' stalemate';
		return cls;
	};

	const renderCapturedPieces = (color) => {
		const pieces = capturedPieces[color];
		const order = ['queen', 'rook', 'bishop', 'knight', 'pawn'];
		const sorted = [...pieces].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
		return (
			<div className="captured-pieces">
				{sorted.map((p, i) => (
					<span key={i} className="captured">
						{PIECE_SYMBOLS[p.color][p.type]}
					</span>
				))}
			</div>
		);
	};

	return (
		<div className="chess-page">
			<h1>Chess</h1>
			<div className={getStatusClass()}>
				{getStatusText()}
			</div>

			{renderCapturedPieces('white')}

			<div className="chess-board-wrapper">
				{RANKS.map((rank, rowIdx) => (
					<div className="chess-board-row" key={rank}>
						<div className="chess-rank-label">{rank}</div>
						{FILES.map((file, colIdx) => {
							const piece = board[rowIdx][colIdx];
							return (
								<div
									key={`${rank}${file}`}
									className={getSquareClasses(rowIdx, colIdx)}
									onClick={() => handleSquareClick(rowIdx, colIdx)}
								>
									{piece && (
										<span className={`piece ${piece.color}-piece`}>
											{PIECE_SYMBOLS[piece.color][piece.type]}
										</span>
									)}
								</div>
							);
						})}
					</div>
				))}
				<div className="chess-file-labels">
					{FILES.map(file => (
						<div className="chess-file-label" key={file}>{file}</div>
					))}
				</div>
			</div>

			{renderCapturedPieces('black')}

			<div className="chess-controls">
				<button onClick={resetGame}>New Game</button>
			</div>

			<div style={{ marginTop: '12px', color: '#666', fontSize: '0.85rem' }}>
				Moves played: {moveHistory.length}
			</div>

			{promotionPending && (
				<div className="chess-promotion-overlay">
					<div className="chess-promotion-dialog">
						<h3>Promote pawn to:</h3>
						<div className="chess-promotion-options">
							{['queen', 'rook', 'bishop', 'knight'].map(type => (
								<button key={type} onClick={() => handlePromotion(type)}>
									{PIECE_SYMBOLS[turn][type]}
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChessGame;
