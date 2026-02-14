import React, { useState, useCallback } from 'react';
import './ChessGame.css';

const PIECES = {
	wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
	bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

const initialBoard = () => [
	['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
	['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
	['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
];

const cloneBoard = (board) => board.map(row => [...row]);

const getPieceColor = (piece) => {
	if (!piece) return null;
	return piece[0];
};

const inBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

const getPseudoLegalMoves = (board, row, col, enPassantTarget, castlingRights) => {
	const piece = board[row][col];
	if (!piece) return [];
	const color = piece[0];
	const type = piece[1];
	const moves = [];
	const enemy = color === 'w' ? 'b' : 'w';

	const addMove = (r, c) => {
		if (inBounds(r, c) && getPieceColor(board[r][c]) !== color) {
			moves.push([r, c]);
		}
	};

	const addSliding = (directions) => {
		for (const [dr, dc] of directions) {
			let r = row + dr;
			let c = col + dc;
			while (inBounds(r, c)) {
				if (board[r][c]) {
					if (getPieceColor(board[r][c]) === enemy) moves.push([r, c]);
					break;
				}
				moves.push([r, c]);
				r += dr;
				c += dc;
			}
		}
	};

	switch (type) {
		case 'P': {
			const dir = color === 'w' ? -1 : 1;
			const startRow = color === 'w' ? 6 : 1;
			// Forward
			if (inBounds(row + dir, col) && !board[row + dir][col]) {
				moves.push([row + dir, col]);
				// Double push
				if (row === startRow && !board[row + 2 * dir][col]) {
					moves.push([row + 2 * dir, col]);
				}
			}
			// Captures
			for (const dc of [-1, 1]) {
				const nr = row + dir;
				const nc = col + dc;
				if (inBounds(nr, nc)) {
					if (board[nr][nc] && getPieceColor(board[nr][nc]) === enemy) {
						moves.push([nr, nc]);
					}
					// En passant
					if (enPassantTarget && enPassantTarget[0] === nr && enPassantTarget[1] === nc) {
						moves.push([nr, nc]);
					}
				}
			}
			break;
		}
		case 'N': {
			const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
			for (const [dr, dc] of knightMoves) addMove(row + dr, col + dc);
			break;
		}
		case 'B':
			addSliding([[-1, -1], [-1, 1], [1, -1], [1, 1]]);
			break;
		case 'R':
			addSliding([[-1, 0], [1, 0], [0, -1], [0, 1]]);
			break;
		case 'Q':
			addSliding([[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]);
			break;
		case 'K': {
			const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
			for (const [dr, dc] of kingMoves) addMove(row + dr, col + dc);
			// Castling
			if (castlingRights) {
				const backRank = color === 'w' ? 7 : 0;
				if (row === backRank && col === 4) {
					// Kingside
					if (castlingRights[color + 'K'] &&
						!board[backRank][5] && !board[backRank][6] &&
						board[backRank][7] === color + 'R') {
						moves.push([backRank, 6]);
					}
					// Queenside
					if (castlingRights[color + 'Q'] &&
						!board[backRank][3] && !board[backRank][2] && !board[backRank][1] &&
						board[backRank][0] === color + 'R') {
						moves.push([backRank, 2]);
					}
				}
			}
			break;
		}
		default:
			break;
	}

	return moves;
};

const isSquareAttacked = (board, row, col, byColor) => {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && getPieceColor(piece) === byColor) {
				const moves = getPseudoLegalMoves(board, r, c, null, null);
				if (moves.some(([mr, mc]) => mr === row && mc === col)) {
					return true;
				}
			}
		}
	}
	return false;
};

const findKing = (board, color) => {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			if (board[r][c] === color + 'K') return [r, c];
		}
	}
	return null;
};

const isInCheck = (board, color) => {
	const king = findKing(board, color);
	if (!king) return false;
	const enemy = color === 'w' ? 'b' : 'w';
	return isSquareAttacked(board, king[0], king[1], enemy);
};

const simulateMove = (board, fromRow, fromCol, toRow, toCol, enPassantTarget) => {
	const newBoard = cloneBoard(board);
	const piece = newBoard[fromRow][fromCol];
	const color = piece[0];
	const type = piece[1];

	// En passant capture
	if (type === 'P' && enPassantTarget &&
		toRow === enPassantTarget[0] && toCol === enPassantTarget[1]) {
		const capturedRow = color === 'w' ? toRow + 1 : toRow - 1;
		newBoard[capturedRow][toCol] = null;
	}

	newBoard[toRow][toCol] = piece;
	newBoard[fromRow][fromCol] = null;

	// Castling rook movement
	if (type === 'K') {
		const backRank = color === 'w' ? 7 : 0;
		if (fromRow === backRank && fromCol === 4) {
			if (toCol === 6) {
				newBoard[backRank][5] = newBoard[backRank][7];
				newBoard[backRank][7] = null;
			} else if (toCol === 2) {
				newBoard[backRank][3] = newBoard[backRank][0];
				newBoard[backRank][0] = null;
			}
		}
	}

	return newBoard;
};

const getLegalMoves = (board, row, col, enPassantTarget, castlingRights) => {
	const piece = board[row][col];
	if (!piece) return [];
	const color = piece[0];
	const type = piece[1];
	const enemy = color === 'w' ? 'b' : 'w';
	const pseudoMoves = getPseudoLegalMoves(board, row, col, enPassantTarget, castlingRights);

	return pseudoMoves.filter(([toRow, toCol]) => {
		// For castling, check that king doesn't pass through or land on attacked square
		if (type === 'K') {
			const backRank = color === 'w' ? 7 : 0;
			if (row === backRank && col === 4) {
				if (toCol === 6) {
					// Kingside castling
					if (isInCheck(board, color)) return false;
					if (isSquareAttacked(board, backRank, 5, enemy)) return false;
					if (isSquareAttacked(board, backRank, 6, enemy)) return false;
					return true;
				}
				if (toCol === 2) {
					// Queenside castling
					if (isInCheck(board, color)) return false;
					if (isSquareAttacked(board, backRank, 3, enemy)) return false;
					if (isSquareAttacked(board, backRank, 2, enemy)) return false;
					return true;
				}
			}
		}

		const newBoard = simulateMove(board, row, col, toRow, toCol, enPassantTarget);
		return !isInCheck(newBoard, color);
	});
};

const hasAnyLegalMoves = (board, color, enPassantTarget, castlingRights) => {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			if (board[r][c] && getPieceColor(board[r][c]) === color) {
				const moves = getLegalMoves(board, r, c, enPassantTarget, castlingRights);
				if (moves.length > 0) return true;
			}
		}
	}
	return false;
};

const toAlgebraic = (row, col) => FILES[col] + RANKS[row];

const getMoveNotation = (board, fromRow, fromCol, toRow, toCol, promotionPiece, enPassantTarget) => {
	const piece = board[fromRow][fromCol];
	const type = piece[1];
	const captured = board[toRow][toCol];
	const isEnPassant = type === 'P' && enPassantTarget &&
		toRow === enPassantTarget[0] && toCol === enPassantTarget[1];

	// Castling
	if (type === 'K' && Math.abs(toCol - fromCol) === 2) {
		return toCol === 6 ? 'O-O' : 'O-O-O';
	}

	let notation = '';

	if (type !== 'P') {
		notation += type;
	}

	if (captured || isEnPassant) {
		if (type === 'P') notation += FILES[fromCol];
		notation += 'x';
	}

	notation += toAlgebraic(toRow, toCol);

	if (promotionPiece) {
		notation += '=' + promotionPiece;
	}

	return notation;
};

const ChessGame = () => {
	const [board, setBoard] = useState(initialBoard);
	const [turn, setTurn] = useState('w');
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [legalMoves, setLegalMoves] = useState([]);
	const [enPassantTarget, setEnPassantTarget] = useState(null);
	const [castlingRights, setCastlingRights] = useState({
		wK: true, wQ: true, bK: true, bQ: true,
	});
	const [moveHistory, setMoveHistory] = useState([]);
	const [capturedPieces, setCapturedPieces] = useState({ w: [], b: [] });
	const [gameStatus, setGameStatus] = useState('playing');
	const [lastMove, setLastMove] = useState(null);
	const [promotionPending, setPromotionPending] = useState(null);

	const resetGame = useCallback(() => {
		setBoard(initialBoard());
		setTurn('w');
		setSelectedSquare(null);
		setLegalMoves([]);
		setEnPassantTarget(null);
		setCastlingRights({ wK: true, wQ: true, bK: true, bQ: true });
		setMoveHistory([]);
		setCapturedPieces({ w: [], b: [] });
		setGameStatus('playing');
		setLastMove(null);
		setPromotionPending(null);
	}, []);

	const executeMove = useCallback((fromRow, fromCol, toRow, toCol, promoChoice) => {
		const currentBoard = board;
		const piece = currentBoard[fromRow][fromCol];
		const color = piece[0];
		const type = piece[1];
		const captured = currentBoard[toRow][toCol];
		const isEnPassant = type === 'P' && enPassantTarget &&
			toRow === enPassantTarget[0] && toCol === enPassantTarget[1];

		const notation = getMoveNotation(currentBoard, fromRow, fromCol, toRow, toCol, promoChoice, enPassantTarget);

		// Build new board
		const newBoard = simulateMove(currentBoard, fromRow, fromCol, toRow, toCol, enPassantTarget);

		// Pawn promotion
		if (type === 'P' && (toRow === 0 || toRow === 7)) {
			const promoPiece = promoChoice || 'Q';
			newBoard[toRow][toCol] = color + promoPiece;
		}

		// Update captured pieces
		const newCaptured = { w: [...capturedPieces.w], b: [...capturedPieces.b] };
		if (captured) {
			newCaptured[captured[0]].push(captured);
		} else if (isEnPassant) {
			const enemyPawn = color === 'w' ? 'bP' : 'wP';
			newCaptured[enemyPawn[0]].push(enemyPawn);
		}

		// Update castling rights
		const newCastling = { ...castlingRights };
		if (type === 'K') {
			newCastling[color + 'K'] = false;
			newCastling[color + 'Q'] = false;
		}
		if (type === 'R') {
			const backRank = color === 'w' ? 7 : 0;
			if (fromRow === backRank && fromCol === 0) newCastling[color + 'Q'] = false;
			if (fromRow === backRank && fromCol === 7) newCastling[color + 'K'] = false;
		}
		// If a rook is captured
		if (captured && captured[1] === 'R') {
			const capturedColor = captured[0];
			const capturedBackRank = capturedColor === 'w' ? 7 : 0;
			if (toRow === capturedBackRank && toCol === 0) newCastling[capturedColor + 'Q'] = false;
			if (toRow === capturedBackRank && toCol === 7) newCastling[capturedColor + 'K'] = false;
		}

		// Update en passant target
		let newEnPassant = null;
		if (type === 'P' && Math.abs(toRow - fromRow) === 2) {
			newEnPassant = [(fromRow + toRow) / 2, fromCol];
		}

		const nextTurn = color === 'w' ? 'b' : 'w';

		// Check game state
		const inCheck = isInCheck(newBoard, nextTurn);
		const hasLegal = hasAnyLegalMoves(newBoard, nextTurn, newEnPassant, newCastling);

		let finalNotation = notation;
		let newStatus = 'playing';
		if (!hasLegal) {
			if (inCheck) {
				finalNotation += '#';
				newStatus = 'checkmate';
			} else {
				newStatus = 'stalemate';
			}
		} else if (inCheck) {
			finalNotation += '+';
		}

		// Update move history
		const newHistory = [...moveHistory];
		if (color === 'w') {
			newHistory.push({ white: finalNotation, black: '' });
		} else {
			if (newHistory.length > 0) {
				newHistory[newHistory.length - 1] = {
					...newHistory[newHistory.length - 1],
					black: finalNotation,
				};
			}
		}

		setBoard(newBoard);
		setTurn(nextTurn);
		setSelectedSquare(null);
		setLegalMoves([]);
		setEnPassantTarget(newEnPassant);
		setCastlingRights(newCastling);
		setMoveHistory(newHistory);
		setCapturedPieces(newCaptured);
		setGameStatus(newStatus);
		setLastMove({ from: [fromRow, fromCol], to: [toRow, toCol] });
	}, [board, enPassantTarget, castlingRights, moveHistory, capturedPieces]);

	const handleSquareClick = useCallback((row, col) => {
		if (gameStatus !== 'playing') return;
		if (promotionPending) return;

		const piece = board[row][col];

		if (selectedSquare) {
			const [selRow, selCol] = selectedSquare;

			// Check if clicking on own piece to reselect
			if (piece && getPieceColor(piece) === turn) {
				const moves = getLegalMoves(board, row, col, enPassantTarget, castlingRights);
				setSelectedSquare([row, col]);
				setLegalMoves(moves);
				return;
			}

			// Check if this is a legal move
			const isLegal = legalMoves.some(([mr, mc]) => mr === row && mc === col);
			if (isLegal) {
				const movingPiece = board[selRow][selCol];
				// Check for pawn promotion
				if (movingPiece[1] === 'P' && (row === 0 || row === 7)) {
					setPromotionPending({ from: [selRow, selCol], to: [row, col] });
					return;
				}
				executeMove(selRow, selCol, row, col, null);
			} else {
				setSelectedSquare(null);
				setLegalMoves([]);
			}
		} else {
			if (piece && getPieceColor(piece) === turn) {
				const moves = getLegalMoves(board, row, col, enPassantTarget, castlingRights);
				setSelectedSquare([row, col]);
				setLegalMoves(moves);
			}
		}
	}, [board, turn, selectedSquare, legalMoves, enPassantTarget, castlingRights, gameStatus, promotionPending, executeMove]);

	const handlePromotion = useCallback((pieceType) => {
		if (!promotionPending) return;
		const { from, to } = promotionPending;
		setPromotionPending(null);
		executeMove(from[0], from[1], to[0], to[1], pieceType);
	}, [promotionPending, executeMove]);

	const getSquareClasses = (row, col) => {
		const classes = ['chess-square'];
		classes.push((row + col) % 2 === 0 ? 'light' : 'dark');

		if (selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col) {
			classes.push('selected');
		}

		if (lastMove) {
			if (lastMove.from[0] === row && lastMove.from[1] === col) classes.push('last-move-from');
			if (lastMove.to[0] === row && lastMove.to[1] === col) classes.push('last-move-to');
		}

		const isLegal = legalMoves.some(([mr, mc]) => mr === row && mc === col);
		if (isLegal) {
			if (board[row][col]) {
				classes.push('legal-capture');
			} else {
				classes.push('legal-move');
			}
		}

		// King in check highlight
		const piece = board[row][col];
		if (piece && piece[1] === 'K' && getPieceColor(piece) === turn && isInCheck(board, turn)) {
			classes.push('king-in-check');
		}

		return classes.join(' ');
	};

	const getStatusText = () => {
		if (gameStatus === 'checkmate') {
			const winner = turn === 'w' ? 'Black' : 'White';
			return `Checkmate! ${winner} wins!`;
		}
		if (gameStatus === 'stalemate') {
			return 'Stalemate! Draw.';
		}
		const inCheck = isInCheck(board, turn);
		const turnName = turn === 'w' ? 'White' : 'Black';
		return inCheck ? `${turnName} is in check!` : `${turnName} to move`;
	};

	const getStatusClass = () => {
		if (gameStatus === 'checkmate') return 'chess-status checkmate';
		if (gameStatus === 'stalemate') return 'chess-status stalemate';
		if (isInCheck(board, turn)) return 'chess-status check';
		return 'chess-status';
	};

	const pieceOrder = { Q: 0, R: 1, B: 2, N: 3, P: 4 };
	const sortCaptured = (pieces) =>
		[...pieces].sort((a, b) => (pieceOrder[a[1]] || 5) - (pieceOrder[b[1]] || 5));

	return (
		<div className="chess-page">
			<h1>Chess</h1>
			<div className={getStatusClass()}>{getStatusText()}</div>

			<div className="chess-layout">
				<div className="chess-board-wrapper">
					<div className="board-with-coords">
						<div className="rank-labels">
							{RANKS.map((rank) => (
								<div key={rank} className="coord-label">{rank}</div>
							))}
						</div>
						<div>
							<div className="chess-board">
								{board.map((rowArr, row) =>
									rowArr.map((piece, col) => (
										<div
											key={`${row}-${col}`}
											className={getSquareClasses(row, col)}
											onClick={() => handleSquareClick(row, col)}
										>
											{piece ? PIECES[piece] : ''}
										</div>
									))
								)}
							</div>
							<div className="file-labels">
								{FILES.map((file) => (
									<div key={file} className="coord-label">{file}</div>
								))}
							</div>
						</div>
					</div>

					<div className="chess-controls">
						<button className="chess-btn" onClick={resetGame}>New Game</button>
					</div>
				</div>

				<div className="chess-sidebar">
					<div className="captured-pieces">
						<h3>Captured by White</h3>
						<div className="pieces">
							{sortCaptured(capturedPieces.b).map((p, i) => (
								<span key={i}>{PIECES[p]}</span>
							))}
						</div>
					</div>
					<div className="captured-pieces">
						<h3>Captured by Black</h3>
						<div className="pieces">
							{sortCaptured(capturedPieces.w).map((p, i) => (
								<span key={i}>{PIECES[p]}</span>
							))}
						</div>
					</div>
					<div className="move-history">
						<h3>Move History</h3>
						<div className="move-history-list">
							{moveHistory.map((move, i) => (
								<div key={i} className="move-row">
									<span className="move-number">{i + 1}.</span>
									<span className="move-white">{move.white}</span>
									<span className="move-black">{move.black}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{promotionPending && (
				<div className="promotion-overlay">
					<div className="promotion-dialog">
						<h3>Promote pawn to:</h3>
						<div className="promotion-options">
							{['Q', 'R', 'B', 'N'].map((p) => (
								<div
									key={p}
									className="promotion-option"
									onClick={() => handlePromotion(p)}
								>
									{PIECES[turn + p]}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChessGame;
