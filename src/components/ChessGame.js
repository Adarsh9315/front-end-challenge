import React, { useState, useCallback } from 'react';
import './ChessGame.css';

// Piece constants
const EMPTY = null;
const WHITE = 'white';
const BLACK = 'black';

// Unicode chess pieces
const PIECE_SYMBOLS = {
	white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
	black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' },
};

const createPiece = (color, type) => ({ color, type });

const getInitialBoard = () => {
	const board = Array(8).fill(null).map(() => Array(8).fill(EMPTY));

	// Black pieces (top)
	board[0][0] = createPiece(BLACK, 'rook');
	board[0][1] = createPiece(BLACK, 'knight');
	board[0][2] = createPiece(BLACK, 'bishop');
	board[0][3] = createPiece(BLACK, 'queen');
	board[0][4] = createPiece(BLACK, 'king');
	board[0][5] = createPiece(BLACK, 'bishop');
	board[0][6] = createPiece(BLACK, 'knight');
	board[0][7] = createPiece(BLACK, 'rook');
	for (let c = 0; c < 8; c++) board[1][c] = createPiece(BLACK, 'pawn');

	// White pieces (bottom)
	board[7][0] = createPiece(WHITE, 'rook');
	board[7][1] = createPiece(WHITE, 'knight');
	board[7][2] = createPiece(WHITE, 'bishop');
	board[7][3] = createPiece(WHITE, 'queen');
	board[7][4] = createPiece(WHITE, 'king');
	board[7][5] = createPiece(WHITE, 'bishop');
	board[7][6] = createPiece(WHITE, 'knight');
	board[7][7] = createPiece(WHITE, 'rook');
	for (let c = 0; c < 8; c++) board[6][c] = createPiece(WHITE, 'pawn');

	return board;
};

const cloneBoard = (board) => board.map(row => row.map(cell => cell ? { ...cell } : null));

const inBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

// Find king position
const findKing = (board, color) => {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const p = board[r][c];
			if (p && p.color === color && p.type === 'king') return [r, c];
		}
	}
	return null;
};

// Get raw moves for a piece (without checking if they leave king in check)
const getRawMoves = (board, row, col, enPassantTarget, castlingRights) => {
	const piece = board[row][col];
	if (!piece) return [];
	const moves = [];
	const { color, type } = piece;
	const enemy = color === WHITE ? BLACK : WHITE;
	const direction = color === WHITE ? -1 : 1;

	const addIfValid = (r, c) => {
		if (!inBounds(r, c)) return false;
		if (!board[r][c]) { moves.push([r, c]); return true; }
		if (board[r][c].color === enemy) { moves.push([r, c]); return false; }
		return false;
	};

	const addSliding = (dr, dc) => {
		let r = row + dr, c = col + dc;
		while (inBounds(r, c)) {
			if (!board[r][c]) { moves.push([r, c]); }
			else {
				if (board[r][c].color === enemy) moves.push([r, c]);
				break;
			}
			r += dr; c += dc;
		}
	};

	switch (type) {
		case 'pawn': {
			const startRow = color === WHITE ? 6 : 1;
			// Forward
			if (inBounds(row + direction, col) && !board[row + direction][col]) {
				moves.push([row + direction, col]);
				// Double move from start
				if (row === startRow && !board[row + 2 * direction][col]) {
					moves.push([row + 2 * direction, col]);
				}
			}
			// Captures
			for (const dc of [-1, 1]) {
				const nr = row + direction, nc = col + dc;
				if (inBounds(nr, nc)) {
					if (board[nr][nc] && board[nr][nc].color === enemy) {
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
		case 'knight': {
			const offsets = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
			for (const [dr, dc] of offsets) addIfValid(row + dr, col + dc);
			break;
		}
		case 'bishop':
			addSliding(-1, -1); addSliding(-1, 1); addSliding(1, -1); addSliding(1, 1);
			break;
		case 'rook':
			addSliding(-1, 0); addSliding(1, 0); addSliding(0, -1); addSliding(0, 1);
			break;
		case 'queen':
			addSliding(-1, -1); addSliding(-1, 1); addSliding(1, -1); addSliding(1, 1);
			addSliding(-1, 0); addSliding(1, 0); addSliding(0, -1); addSliding(0, 1);
			break;
		case 'king': {
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					if (dr === 0 && dc === 0) continue;
					addIfValid(row + dr, col + dc);
				}
			}
			// Castling
			if (castlingRights) {
				const rights = castlingRights[color];
				const baseRow = color === WHITE ? 7 : 0;
				if (row === baseRow && col === 4) {
					// Kingside
					if (rights.kingSide && !board[baseRow][5] && !board[baseRow][6] &&
						board[baseRow][7] && board[baseRow][7].type === 'rook' && board[baseRow][7].color === color) {
						moves.push([baseRow, 6]);
					}
					// Queenside
					if (rights.queenSide && !board[baseRow][3] && !board[baseRow][2] && !board[baseRow][1] &&
						board[baseRow][0] && board[baseRow][0].type === 'rook' && board[baseRow][0].color === color) {
						moves.push([baseRow, 2]);
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

// Check if a color is in check
const isInCheck = (board, color) => {
	const kingPos = findKing(board, color);
	if (!kingPos) return false;
	const enemy = color === WHITE ? BLACK : WHITE;
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const p = board[r][c];
			if (p && p.color === enemy) {
				const attacks = getRawMoves(board, r, c, null, null);
				if (attacks.some(([ar, ac]) => ar === kingPos[0] && ac === kingPos[1])) {
					return true;
				}
			}
		}
	}
	return false;
};

// Check if a square is attacked by enemy
const isSquareAttacked = (board, row, col, byColor) => {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const p = board[r][c];
			if (p && p.color === byColor) {
				const attacks = getRawMoves(board, r, c, null, null);
				if (attacks.some(([ar, ac]) => ar === row && ac === col)) {
					return true;
				}
			}
		}
	}
	return false;
};

// Get legal moves (filter out moves that leave king in check)
const getLegalMoves = (board, row, col, enPassantTarget, castlingRights) => {
	const piece = board[row][col];
	if (!piece) return [];
	const rawMoves = getRawMoves(board, row, col, enPassantTarget, castlingRights);
	const legalMoves = [];
	const { color, type } = piece;
	const enemy = color === WHITE ? BLACK : WHITE;

	for (const [tr, tc] of rawMoves) {
		// Castling: check that king doesn't pass through or land on attacked square
		if (type === 'king' && Math.abs(tc - col) === 2) {
			const baseRow = color === WHITE ? 7 : 0;
			if (isInCheck(board, color)) continue;
			const step = tc > col ? 1 : -1;
			const midCol = col + step;
			if (isSquareAttacked(board, baseRow, midCol, enemy)) continue;
			if (isSquareAttacked(board, baseRow, tc, enemy)) continue;
			legalMoves.push([tr, tc]);
			continue;
		}

		// Simulate the move
		const newBoard = cloneBoard(board);
		newBoard[tr][tc] = newBoard[row][col];
		newBoard[row][col] = null;

		// En passant capture
		if (type === 'pawn' && enPassantTarget && tr === enPassantTarget[0] && tc === enPassantTarget[1]) {
			const capturedRow = color === WHITE ? tr + 1 : tr - 1;
			newBoard[capturedRow][tc] = null;
		}

		if (!isInCheck(newBoard, color)) {
			legalMoves.push([tr, tc]);
		}
	}
	return legalMoves;
};

// Check if a player has any legal moves
const hasLegalMoves = (board, color, enPassantTarget, castlingRights) => {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const p = board[r][c];
			if (p && p.color === color) {
				const moves = getLegalMoves(board, r, c, enPassantTarget, castlingRights);
				if (moves.length > 0) return true;
			}
		}
	}
	return false;
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

const ChessGame = () => {
	const [board, setBoard] = useState(getInitialBoard);
	const [currentTurn, setCurrentTurn] = useState(WHITE);
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [validMoves, setValidMoves] = useState([]);
	const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'check', 'checkmate', 'stalemate'
	const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
	const [lastMove, setLastMove] = useState(null);
	const [enPassantTarget, setEnPassantTarget] = useState(null);
	const [castlingRights, setCastlingRights] = useState({
		white: { kingSide: true, queenSide: true },
		black: { kingSide: true, queenSide: true },
	});
	const [promotionPending, setPromotionPending] = useState(null);
	const [moveHistory, setMoveHistory] = useState([]);

	const resetGame = useCallback(() => {
		setBoard(getInitialBoard());
		setCurrentTurn(WHITE);
		setSelectedSquare(null);
		setValidMoves([]);
		setGameStatus('playing');
		setCapturedPieces({ white: [], black: [] });
		setLastMove(null);
		setEnPassantTarget(null);
		setCastlingRights({
			white: { kingSide: true, queenSide: true },
			black: { kingSide: true, queenSide: true },
		});
		setPromotionPending(null);
		setMoveHistory([]);
	}, []);

	const executeMove = useCallback((fromRow, fromCol, toRow, toCol, promotionType) => {
		const newBoard = cloneBoard(board);
		const piece = newBoard[fromRow][fromCol];
		const captured = newBoard[toRow][toCol];
		const newCaptured = { ...capturedPieces, white: [...capturedPieces.white], black: [...capturedPieces.black] };
		let newEnPassant = null;
		const newCastling = {
			white: { ...castlingRights.white },
			black: { ...castlingRights.black },
		};

		// Track captured piece
		if (captured) {
			newCaptured[captured.color].push(captured);
		}

		// En passant capture
		if (piece.type === 'pawn' && enPassantTarget && toRow === enPassantTarget[0] && toCol === enPassantTarget[1]) {
			const capturedRow = piece.color === WHITE ? toRow + 1 : toRow - 1;
			const epCaptured = newBoard[capturedRow][toCol];
			if (epCaptured) newCaptured[epCaptured.color].push(epCaptured);
			newBoard[capturedRow][toCol] = null;
		}

		// Move piece
		newBoard[toRow][toCol] = piece;
		newBoard[fromRow][fromCol] = null;

		// Pawn double move -> set en passant target
		if (piece.type === 'pawn' && Math.abs(toRow - fromRow) === 2) {
			const epRow = (fromRow + toRow) / 2;
			newEnPassant = [epRow, toCol];
		}

		// Pawn promotion
		if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
			if (promotionType) {
				newBoard[toRow][toCol] = createPiece(piece.color, promotionType);
			} else {
				// Need to ask for promotion choice
				setPromotionPending({ fromRow, fromCol, toRow, toCol });
				return;
			}
		}

		// Castling move
		if (piece.type === 'king' && Math.abs(toCol - fromCol) === 2) {
			if (toCol === 6) {
				// Kingside
				newBoard[toRow][5] = newBoard[toRow][7];
				newBoard[toRow][7] = null;
			} else if (toCol === 2) {
				// Queenside
				newBoard[toRow][3] = newBoard[toRow][0];
				newBoard[toRow][0] = null;
			}
		}

		// Update castling rights
		if (piece.type === 'king') {
			newCastling[piece.color].kingSide = false;
			newCastling[piece.color].queenSide = false;
		}
		if (piece.type === 'rook') {
			if (fromCol === 0) newCastling[piece.color].queenSide = false;
			if (fromCol === 7) newCastling[piece.color].kingSide = false;
		}
		// If a rook is captured
		if (captured && captured.type === 'rook') {
			if (toCol === 0) newCastling[captured.color].queenSide = false;
			if (toCol === 7) newCastling[captured.color].kingSide = false;
		}

		const nextTurn = piece.color === WHITE ? BLACK : WHITE;

		// Check game state
		const inCheck = isInCheck(newBoard, nextTurn);
		const hasMovesLeft = hasLegalMoves(newBoard, nextTurn, newEnPassant, newCastling);

		let status = 'playing';
		if (inCheck && !hasMovesLeft) {
			status = 'checkmate';
		} else if (!inCheck && !hasMovesLeft) {
			status = 'stalemate';
		} else if (inCheck) {
			status = 'check';
		}

		// Build move notation
		const moveNotation = `${piece.type === 'pawn' ? '' : piece.type[0].toUpperCase()}${FILES[fromCol]}${RANKS[fromRow]}${captured ? 'x' : '-'}${FILES[toCol]}${RANKS[toRow]}`;

		setBoard(newBoard);
		setCurrentTurn(nextTurn);
		setSelectedSquare(null);
		setValidMoves([]);
		setGameStatus(status);
		setCapturedPieces(newCaptured);
		setLastMove({ from: [fromRow, fromCol], to: [toRow, toCol] });
		setEnPassantTarget(newEnPassant);
		setCastlingRights(newCastling);
		setMoveHistory(prev => [...prev, moveNotation]);
	}, [board, capturedPieces, castlingRights, enPassantTarget]);

	const handleSquareClick = useCallback((row, col) => {
		if (gameStatus === 'checkmate' || gameStatus === 'stalemate') return;
		if (promotionPending) return;

		const piece = board[row][col];

		if (selectedSquare) {
			const [selRow, selCol] = selectedSquare;

			// Check if clicking on own piece -> reselect
			if (piece && piece.color === currentTurn) {
				if (selRow === row && selCol === col) {
					setSelectedSquare(null);
					setValidMoves([]);
					return;
				}
				const moves = getLegalMoves(board, row, col, enPassantTarget, castlingRights);
				setSelectedSquare([row, col]);
				setValidMoves(moves);
				return;
			}

			// Check if this is a valid move
			const isValid = validMoves.some(([mr, mc]) => mr === row && mc === col);
			if (isValid) {
				executeMove(selRow, selCol, row, col, null);
			} else {
				setSelectedSquare(null);
				setValidMoves([]);
			}
		} else {
			// Select a piece
			if (piece && piece.color === currentTurn) {
				const moves = getLegalMoves(board, row, col, enPassantTarget, castlingRights);
				setSelectedSquare([row, col]);
				setValidMoves(moves);
			}
		}
	}, [board, currentTurn, selectedSquare, validMoves, gameStatus, enPassantTarget, castlingRights, executeMove, promotionPending]);

	const handlePromotion = useCallback((pieceType) => {
		if (!promotionPending) return;
		const { fromRow, fromCol, toRow, toCol } = promotionPending;
		setPromotionPending(null);
		executeMove(fromRow, fromCol, toRow, toCol, pieceType);
	}, [promotionPending, executeMove]);

	const getStatusText = () => {
		switch (gameStatus) {
			case 'checkmate':
				return `Checkmate! ${currentTurn === WHITE ? 'Black' : 'White'} wins!`;
			case 'stalemate':
				return 'Stalemate! The game is a draw.';
			case 'check':
				return `${currentTurn === WHITE ? 'White' : 'Black'} is in check!`;
			default:
				return `${currentTurn === WHITE ? 'White' : 'Black'} to move`;
		}
	};

	const getStatusClass = () => {
		if (gameStatus === 'checkmate' || gameStatus === 'stalemate') return 'chess-status game-over';
		if (gameStatus === 'check') return 'chess-status in-check';
		return 'chess-status';
	};

	const isLastMoveSquare = (row, col) => {
		if (!lastMove) return null;
		if (lastMove.from[0] === row && lastMove.from[1] === col) return 'last-move-from';
		if (lastMove.to[0] === row && lastMove.to[1] === col) return 'last-move-to';
		return null;
	};

	const isKingInCheck = (row, col) => {
		if (gameStatus !== 'check') return false;
		const piece = board[row][col];
		return piece && piece.type === 'king' && piece.color === currentTurn;
	};

	const renderPiece = (piece) => {
		if (!piece) return null;
		return (
			<span className={`chess-piece ${piece.color}-piece`}>
				{PIECE_SYMBOLS[piece.color][piece.type]}
			</span>
		);
	};

	const renderCaptured = (color) => {
		const pieces = capturedPieces[color];
		const order = ['queen', 'rook', 'bishop', 'knight', 'pawn'];
		const sorted = [...pieces].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
		return sorted.map((p, i) => (
			<span key={i}>{PIECE_SYMBOLS[p.color][p.type]}</span>
		));
	};

	return (
		<div className="chess-page">
			<h1>Chess</h1>
			<div className={getStatusClass()}>{getStatusText()}</div>

			<div className="chess-captured-row">
				<div className="chess-captured">
					<span className="chess-captured-label">Captured:</span>
					{renderCaptured(BLACK)}
				</div>
			</div>

			<div className="chess-board-container">
				{[0, 1, 2, 3, 4, 5, 6, 7].map(row => (
					<div key={row} className="chess-row-wrapper">
						<span className="chess-rank-label-side">{RANKS[row]}</span>
						<div style={{ display: 'flex' }}>
							{[0, 1, 2, 3, 4, 5, 6, 7].map(col => {
								const isLight = (row + col) % 2 === 0;
								const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
								const isValidMove = validMoves.some(([mr, mc]) => mr === row && mc === col);
								const isCapture = isValidMove && board[row][col] !== null;
								const lastMoveClass = isLastMoveSquare(row, col);
								const kingCheck = isKingInCheck(row, col);

								let className = `chess-square ${isLight ? 'light' : 'dark'}`;
								if (isSelected) className += ' selected';
								else if (lastMoveClass && !isValidMove) className += ` ${lastMoveClass}`;
								if (isCapture) className += ' valid-capture';
								else if (isValidMove) className += ' valid-move';
								if (kingCheck) className += ' king-in-check';

								return (
									<div
										key={col}
										className={className}
										onClick={() => handleSquareClick(row, col)}
									>
										{renderPiece(board[row][col])}
									</div>
								);
							})}
						</div>
					</div>
				))}
				<div className="chess-file-labels">
					{FILES.map(f => <span key={f}>{f}</span>)}
				</div>
			</div>

			<div className="chess-captured-row">
				<div className="chess-captured">
					<span className="chess-captured-label">Captured:</span>
					{renderCaptured(WHITE)}
				</div>
			</div>

			<div className="chess-controls">
				<div className="chess-turn-indicator">
					<div className={`turn-dot ${currentTurn === WHITE ? 'white-turn' : 'black-turn'}`} />
					<span>{currentTurn === WHITE ? 'White' : 'Black'}'s turn</span>
				</div>
				<button onClick={resetGame}>New Game</button>
			</div>

			{moveHistory.length > 0 && (
				<div style={{ marginTop: 16, fontSize: '0.85rem', color: '#888', maxWidth: 512, textAlign: 'center' }}>
					{moveHistory.map((m, i) => (
						<span key={i} style={{ marginRight: 6 }}>
							{i % 2 === 0 ? `${Math.floor(i / 2) + 1}. ` : ''}{m}
						</span>
					))}
				</div>
			)}

			{promotionPending && (
				<div className="promotion-overlay">
					<div className="promotion-dialog">
						<h3>Promote pawn to:</h3>
						<div className="promotion-options">
							{['queen', 'rook', 'bishop', 'knight'].map(type => (
								<div
									key={type}
									className="promotion-option"
									onClick={() => handlePromotion(type)}
								>
									{PIECE_SYMBOLS[currentTurn][type]}
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
