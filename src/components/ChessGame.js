import React, { useState, useCallback, useRef, useEffect } from 'react';
import './ChessGame.css';

// Piece constants
const EMPTY = null;
const WHITE = 'w';
const BLACK = 'b';

const PAWN = 'p';
const ROOK = 'r';
const KNIGHT = 'n';
const BISHOP = 'b';
const QUEEN = 'q';
const KING = 'k';

// Unicode chess pieces
const PIECE_SYMBOLS = {
	w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
	b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
};

const createPiece = (color, type) => ({ color, type });

const initialBoard = () => {
	const board = Array(8).fill(null).map(() => Array(8).fill(EMPTY));

	// Black pieces (top)
	board[0][0] = createPiece(BLACK, ROOK);
	board[0][1] = createPiece(BLACK, KNIGHT);
	board[0][2] = createPiece(BLACK, BISHOP);
	board[0][3] = createPiece(BLACK, QUEEN);
	board[0][4] = createPiece(BLACK, KING);
	board[0][5] = createPiece(BLACK, BISHOP);
	board[0][6] = createPiece(BLACK, KNIGHT);
	board[0][7] = createPiece(BLACK, ROOK);
	for (let i = 0; i < 8; i++) board[1][i] = createPiece(BLACK, PAWN);

	// White pieces (bottom)
	board[7][0] = createPiece(WHITE, ROOK);
	board[7][1] = createPiece(WHITE, KNIGHT);
	board[7][2] = createPiece(WHITE, BISHOP);
	board[7][3] = createPiece(WHITE, QUEEN);
	board[7][4] = createPiece(WHITE, KING);
	board[7][5] = createPiece(WHITE, BISHOP);
	board[7][6] = createPiece(WHITE, KNIGHT);
	board[7][7] = createPiece(WHITE, ROOK);
	for (let i = 0; i < 8; i++) board[6][i] = createPiece(WHITE, PAWN);

	return board;
};

const cloneBoard = (board) => board.map(row => row.map(cell => cell ? { ...cell } : null));

const inBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

const findKing = (board, color) => {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.color === color && piece.type === KING) {
				return [r, c];
			}
		}
	}
	return null;
};

// Generate raw moves for a piece (without checking if they leave king in check)
const getRawMoves = (board, row, col, enPassantTarget, castlingRights) => {
	const piece = board[row][col];
	if (!piece) return [];

	const moves = [];
	const { color, type } = piece;
	const enemy = color === WHITE ? BLACK : WHITE;

	const addMove = (r, c) => {
		if (inBounds(r, c)) {
			const target = board[r][c];
			if (!target || target.color === enemy) {
				moves.push([r, c]);
			}
		}
	};

	const addSlidingMoves = (directions) => {
		for (const [dr, dc] of directions) {
			let r = row + dr;
			let c = col + dc;
			while (inBounds(r, c)) {
				const target = board[r][c];
				if (!target) {
					moves.push([r, c]);
				} else {
					if (target.color === enemy) moves.push([r, c]);
					break;
				}
				r += dr;
				c += dc;
			}
		}
	};

	switch (type) {
		case PAWN: {
			const dir = color === WHITE ? -1 : 1;
			const startRow = color === WHITE ? 6 : 1;

			// Forward
			if (inBounds(row + dir, col) && !board[row + dir][col]) {
				moves.push([row + dir, col]);
				// Double move from start
				if (row === startRow && !board[row + 2 * dir][col]) {
					moves.push([row + 2 * dir, col]);
				}
			}

			// Captures
			for (const dc of [-1, 1]) {
				const nr = row + dir;
				const nc = col + dc;
				if (inBounds(nr, nc)) {
					const target = board[nr][nc];
					if (target && target.color === enemy) {
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
		case ROOK:
			addSlidingMoves([[0, 1], [0, -1], [1, 0], [-1, 0]]);
			break;
		case BISHOP:
			addSlidingMoves([[1, 1], [1, -1], [-1, 1], [-1, -1]]);
			break;
		case QUEEN:
			addSlidingMoves([[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]);
			break;
		case KNIGHT:
			for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
				addMove(row + dr, col + dc);
			}
			break;
		case KING: {
			for (const [dr, dc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
				addMove(row + dr, col + dc);
			}
			// Castling
			if (castlingRights) {
				const backRank = color === WHITE ? 7 : 0;
				if (row === backRank && col === 4) {
					// Kingside
					const ksKey = color === WHITE ? 'wk' : 'bk';
					if (castlingRights[ksKey] &&
						!board[backRank][5] && !board[backRank][6] &&
						board[backRank][7] && board[backRank][7].type === ROOK && board[backRank][7].color === color) {
						// Check that king doesn't pass through or end in check
						if (!isSquareAttacked(board, backRank, 4, enemy) &&
							!isSquareAttacked(board, backRank, 5, enemy) &&
							!isSquareAttacked(board, backRank, 6, enemy)) {
							moves.push([backRank, 6]);
						}
					}
					// Queenside
					const qsKey = color === WHITE ? 'wq' : 'bq';
					if (castlingRights[qsKey] &&
						!board[backRank][3] && !board[backRank][2] && !board[backRank][1] &&
						board[backRank][0] && board[backRank][0].type === ROOK && board[backRank][0].color === color) {
						if (!isSquareAttacked(board, backRank, 4, enemy) &&
							!isSquareAttacked(board, backRank, 3, enemy) &&
							!isSquareAttacked(board, backRank, 2, enemy)) {
							moves.push([backRank, 2]);
						}
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

// Check if a square is attacked by a given color
const isSquareAttacked = (board, row, col, byColor) => {
	// Check pawn attacks
	const pawnDir = byColor === WHITE ? 1 : -1;
	for (const dc of [-1, 1]) {
		const pr = row + pawnDir;
		const pc = col + dc;
		if (inBounds(pr, pc)) {
			const p = board[pr][pc];
			if (p && p.color === byColor && p.type === PAWN) return true;
		}
	}

	// Check knight attacks
	for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
		const nr = row + dr;
		const nc = col + dc;
		if (inBounds(nr, nc)) {
			const p = board[nr][nc];
			if (p && p.color === byColor && p.type === KNIGHT) return true;
		}
	}

	// Check king attacks
	for (const [dr, dc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
		const nr = row + dr;
		const nc = col + dc;
		if (inBounds(nr, nc)) {
			const p = board[nr][nc];
			if (p && p.color === byColor && p.type === KING) return true;
		}
	}

	// Check sliding pieces (rook/queen on straights, bishop/queen on diagonals)
	const straightDirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
	for (const [dr, dc] of straightDirs) {
		let r = row + dr;
		let c = col + dc;
		while (inBounds(r, c)) {
			const p = board[r][c];
			if (p) {
				if (p.color === byColor && (p.type === ROOK || p.type === QUEEN)) return true;
				break;
			}
			r += dr;
			c += dc;
		}
	}

	const diagDirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
	for (const [dr, dc] of diagDirs) {
		let r = row + dr;
		let c = col + dc;
		while (inBounds(r, c)) {
			const p = board[r][c];
			if (p) {
				if (p.color === byColor && (p.type === BISHOP || p.type === QUEEN)) return true;
				break;
			}
			r += dr;
			c += dc;
		}
	}

	return false;
};

const isInCheck = (board, color) => {
	const kingPos = findKing(board, color);
	if (!kingPos) return false;
	const enemy = color === WHITE ? BLACK : WHITE;
	return isSquareAttacked(board, kingPos[0], kingPos[1], enemy);
};

// Get legal moves (filters out moves that leave king in check)
const getLegalMoves = (board, row, col, enPassantTarget, castlingRights) => {
	const piece = board[row][col];
	if (!piece) return [];

	const rawMoves = getRawMoves(board, row, col, enPassantTarget, castlingRights);
	const legalMoves = [];

	for (const [mr, mc] of rawMoves) {
		const newBoard = cloneBoard(board);
		const movingPiece = newBoard[row][col];

		// Handle en passant capture
		if (movingPiece.type === PAWN && enPassantTarget &&
			mr === enPassantTarget[0] && mc === enPassantTarget[1]) {
			const capturedPawnRow = movingPiece.color === WHITE ? mr + 1 : mr - 1;
			newBoard[capturedPawnRow][mc] = EMPTY;
		}

		// Handle castling rook movement
		if (movingPiece.type === KING && Math.abs(mc - col) === 2) {
			const backRank = movingPiece.color === WHITE ? 7 : 0;
			if (mc === 6) {
				newBoard[backRank][5] = newBoard[backRank][7];
				newBoard[backRank][7] = EMPTY;
			} else if (mc === 2) {
				newBoard[backRank][3] = newBoard[backRank][0];
				newBoard[backRank][0] = EMPTY;
			}
		}

		newBoard[mr][mc] = movingPiece;
		newBoard[row][col] = EMPTY;

		if (!isInCheck(newBoard, piece.color)) {
			legalMoves.push([mr, mc]);
		}
	}

	return legalMoves;
};

// Check if a player has any legal moves
const hasLegalMoves = (board, color, enPassantTarget, castlingRights) => {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.color === color) {
				const moves = getLegalMoves(board, r, c, enPassantTarget, castlingRights);
				if (moves.length > 0) return true;
			}
		}
	}
	return false;
};

// Algebraic notation helpers
const colToFile = (c) => String.fromCharCode(97 + c);
const rowToRank = (r) => String(8 - r);

const pieceTypeToLetter = (type) => {
	switch (type) {
		case KING: return 'K';
		case QUEEN: return 'Q';
		case ROOK: return 'R';
		case BISHOP: return 'B';
		case KNIGHT: return 'N';
		default: return '';
	}
};

const toAlgebraic = (board, fromRow, fromCol, toRow, toCol, piece, captured, isEnPassant, isCastle, promotionType, resultBoard) => {
	if (isCastle) {
		return toCol === 6 ? 'O-O' : 'O-O-O';
	}

	let notation = '';
	const pieceLetter = pieceTypeToLetter(piece.type);

	if (piece.type === PAWN) {
		if (captured || isEnPassant) {
			notation += colToFile(fromCol) + 'x';
		}
		notation += colToFile(toCol) + rowToRank(toRow);
		if (promotionType) {
			notation += '=' + pieceTypeToLetter(promotionType);
		}
	} else {
		notation += pieceLetter;

		// Disambiguation for non-pawn, non-king pieces
		if (piece.type !== KING) {
			let sameTypePieces = [];
			for (let r = 0; r < 8; r++) {
				for (let c = 0; c < 8; c++) {
					if (r === fromRow && c === fromCol) continue;
					const p = board[r][c];
					if (p && p.color === piece.color && p.type === piece.type) {
						const moves = getRawMoves(board, r, c, null, null);
						if (moves.some(([mr, mc]) => mr === toRow && mc === toCol)) {
							sameTypePieces.push([r, c]);
						}
					}
				}
			}
			if (sameTypePieces.length > 0) {
				const sameFile = sameTypePieces.some(([, c]) => c === fromCol);
				const sameRank = sameTypePieces.some(([r]) => r === fromRow);
				if (!sameFile) {
					notation += colToFile(fromCol);
				} else if (!sameRank) {
					notation += rowToRank(fromRow);
				} else {
					notation += colToFile(fromCol) + rowToRank(fromRow);
				}
			}
		}

		if (captured) notation += 'x';
		notation += colToFile(toCol) + rowToRank(toRow);
	}

	// Check/checkmate
	const enemy = piece.color === WHITE ? BLACK : WHITE;
	if (isInCheck(resultBoard, enemy)) {
		if (!hasLegalMoves(resultBoard, enemy, null, null)) {
			notation += '#';
		} else {
			notation += '+';
		}
	}

	return notation;
};

const ChessGame = () => {
	const [board, setBoard] = useState(initialBoard);
	const [turn, setTurn] = useState(WHITE);
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [legalMoves, setLegalMoves] = useState([]);
	const [enPassantTarget, setEnPassantTarget] = useState(null);
	const [castlingRights, setCastlingRights] = useState({ wk: true, wq: true, bk: true, bq: true });
	const [gameStatus, setGameStatus] = useState('playing'); // playing, check, checkmate, stalemate
	const [moveHistory, setMoveHistory] = useState([]);
	const [lastMove, setLastMove] = useState(null);
	const [capturedPieces, setCapturedPieces] = useState({ w: [], b: [] });
	const [promotionPending, setPromotionPending] = useState(null);

	const moveHistoryRef = useRef(null);

	useEffect(() => {
		if (moveHistoryRef.current) {
			moveHistoryRef.current.scrollTop = moveHistoryRef.current.scrollHeight;
		}
	}, [moveHistory]);

	const resetGame = useCallback(() => {
		setBoard(initialBoard());
		setTurn(WHITE);
		setSelectedSquare(null);
		setLegalMoves([]);
		setEnPassantTarget(null);
		setCastlingRights({ wk: true, wq: true, bk: true, bq: true });
		setGameStatus('playing');
		setMoveHistory([]);
		setLastMove(null);
		setCapturedPieces({ w: [], b: [] });
		setPromotionPending(null);
	}, []);

	const executeMove = useCallback((fromRow, fromCol, toRow, toCol, promotionType) => {
		const newBoard = cloneBoard(board);
		const piece = newBoard[fromRow][fromCol];
		const captured = newBoard[toRow][toCol];
		let isEnPassant = false;
		let isCastle = false;

		const newCaptured = { w: [...capturedPieces.w], b: [...capturedPieces.b] };

		// En passant capture
		if (piece.type === PAWN && enPassantTarget &&
			toRow === enPassantTarget[0] && toCol === enPassantTarget[1]) {
			const capturedPawnRow = piece.color === WHITE ? toRow + 1 : toRow - 1;
			const epCaptured = newBoard[capturedPawnRow][toCol];
			if (epCaptured) {
				newCaptured[epCaptured.color].push(epCaptured.type);
			}
			newBoard[capturedPawnRow][toCol] = EMPTY;
			isEnPassant = true;
		}

		// Castling
		if (piece.type === KING && Math.abs(toCol - fromCol) === 2) {
			isCastle = true;
			const backRank = piece.color === WHITE ? 7 : 0;
			if (toCol === 6) {
				newBoard[backRank][5] = newBoard[backRank][7];
				newBoard[backRank][7] = EMPTY;
			} else if (toCol === 2) {
				newBoard[backRank][3] = newBoard[backRank][0];
				newBoard[backRank][0] = EMPTY;
			}
		}

		// Capture
		if (captured) {
			newCaptured[captured.color].push(captured.type);
		}

		// Move piece
		newBoard[toRow][toCol] = piece;
		newBoard[fromRow][fromCol] = EMPTY;

		// Pawn promotion
		if (piece.type === PAWN && (toRow === 0 || toRow === 7)) {
			newBoard[toRow][toCol] = createPiece(piece.color, promotionType || QUEEN);
		}

		// Update en passant target
		let newEnPassant = null;
		if (piece.type === PAWN && Math.abs(toRow - fromRow) === 2) {
			newEnPassant = [(fromRow + toRow) / 2, fromCol];
		}

		// Update castling rights
		const newCastling = { ...castlingRights };
		if (piece.type === KING) {
			if (piece.color === WHITE) { newCastling.wk = false; newCastling.wq = false; }
			else { newCastling.bk = false; newCastling.bq = false; }
		}
		if (piece.type === ROOK) {
			if (fromRow === 7 && fromCol === 0) newCastling.wq = false;
			if (fromRow === 7 && fromCol === 7) newCastling.wk = false;
			if (fromRow === 0 && fromCol === 0) newCastling.bq = false;
			if (fromRow === 0 && fromCol === 7) newCastling.bk = false;
		}
		// If a rook is captured
		if (toRow === 7 && toCol === 0) newCastling.wq = false;
		if (toRow === 7 && toCol === 7) newCastling.wk = false;
		if (toRow === 0 && toCol === 0) newCastling.bq = false;
		if (toRow === 0 && toCol === 7) newCastling.bk = false;

		const actualPromotionType = (piece.type === PAWN && (toRow === 0 || toRow === 7)) ? (promotionType || QUEEN) : null;
		const notation = toAlgebraic(board, fromRow, fromCol, toRow, toCol, piece, captured || isEnPassant, isEnPassant, isCastle, actualPromotionType, newBoard);

		const nextTurn = turn === WHITE ? BLACK : WHITE;

		// Check game status
		const inCheck = isInCheck(newBoard, nextTurn);
		const hasMovesLeft = hasLegalMoves(newBoard, nextTurn, newEnPassant, newCastling);

		let newStatus = 'playing';
		if (inCheck && !hasMovesLeft) {
			newStatus = 'checkmate';
		} else if (!inCheck && !hasMovesLeft) {
			newStatus = 'stalemate';
		} else if (inCheck) {
			newStatus = 'check';
		}

		// Update move history
		const newHistory = [...moveHistory];
		if (turn === WHITE) {
			newHistory.push({ white: notation, black: '' });
		} else {
			if (newHistory.length > 0) {
				newHistory[newHistory.length - 1].black = notation;
			}
		}

		setBoard(newBoard);
		setTurn(nextTurn);
		setSelectedSquare(null);
		setLegalMoves([]);
		setEnPassantTarget(newEnPassant);
		setCastlingRights(newCastling);
		setGameStatus(newStatus);
		setMoveHistory(newHistory);
		setLastMove({ from: [fromRow, fromCol], to: [toRow, toCol] });
		setCapturedPieces(newCaptured);
	}, [board, turn, enPassantTarget, castlingRights, moveHistory, capturedPieces]);

	const handleSquareClick = useCallback((row, col) => {
		if (gameStatus === 'checkmate' || gameStatus === 'stalemate') return;
		if (promotionPending) return;

		const piece = board[row][col];

		if (selectedSquare) {
			const [selRow, selCol] = selectedSquare;

			// Check if clicking on own piece to reselect
			if (piece && piece.color === turn) {
				if (selRow === row && selCol === col) {
					setSelectedSquare(null);
					setLegalMoves([]);
					return;
				}
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
				if (movingPiece.type === PAWN && (row === 0 || row === 7)) {
					setPromotionPending({ fromRow: selRow, fromCol: selCol, toRow: row, toCol: col });
					return;
				}

				executeMove(selRow, selCol, row, col);
			} else {
				setSelectedSquare(null);
				setLegalMoves([]);
			}
		} else {
			if (piece && piece.color === turn) {
				const moves = getLegalMoves(board, row, col, enPassantTarget, castlingRights);
				setSelectedSquare([row, col]);
				setLegalMoves(moves);
			}
		}
	}, [board, turn, selectedSquare, legalMoves, gameStatus, enPassantTarget, castlingRights, executeMove, promotionPending]);

	const handlePromotion = useCallback((type) => {
		if (!promotionPending) return;
		const { fromRow, fromCol, toRow, toCol } = promotionPending;
		setPromotionPending(null);
		executeMove(fromRow, fromCol, toRow, toCol, type);
	}, [promotionPending, executeMove]);

	const getSquareClasses = (row, col) => {
		const classes = ['chess-square'];
		const isLight = (row + col) % 2 === 0;
		classes.push(isLight ? 'light' : 'dark');

		if (selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col) {
			classes.push('selected');
		}

		if (lastMove) {
			if (lastMove.from[0] === row && lastMove.from[1] === col) classes.push('last-move-from');
			if (lastMove.to[0] === row && lastMove.to[1] === col) classes.push('last-move-to');
		}

		const isLegalTarget = legalMoves.some(([mr, mc]) => mr === row && mc === col);
		if (isLegalTarget) {
			const targetPiece = board[row][col];
			if (targetPiece) {
				classes.push('legal-capture');
			} else {
				// Check en passant as capture
				if (selectedSquare) {
					const selPiece = board[selectedSquare[0]][selectedSquare[1]];
					if (selPiece && selPiece.type === PAWN && enPassantTarget &&
						row === enPassantTarget[0] && col === enPassantTarget[1]) {
						classes.push('legal-capture');
					} else {
						classes.push('legal-move');
					}
				} else {
					classes.push('legal-move');
				}
			}
		}

		// King in check highlight
		const piece = board[row][col];
		if (piece && piece.type === KING && piece.color === turn &&
			(gameStatus === 'check' || gameStatus === 'checkmate')) {
			classes.push('king-in-check');
		}

		return classes.join(' ');
	};

	const getStatusText = () => {
		switch (gameStatus) {
			case 'checkmate':
				return `Checkmate! ${turn === WHITE ? 'Black' : 'White'} wins!`;
			case 'stalemate':
				return 'Stalemate! The game is a draw.';
			case 'check':
				return `${turn === WHITE ? 'White' : 'Black'} is in check!`;
			default:
				return `${turn === WHITE ? 'White' : 'Black'} to move`;
		}
	};

	const getStatusClass = () => {
		return `chess-status ${gameStatus}`;
	};

	const pieceValue = { p: 1, n: 3, b: 3, r: 5, q: 9 };
	const sortCaptured = (pieces) => [...pieces].sort((a, b) => (pieceValue[a] || 0) - (pieceValue[b] || 0));

	return (
		<div className="chess-page">
			<h1>CHESS</h1>
			<div className={getStatusClass()}>{getStatusText()}</div>

			<div className="chess-layout">
				<div className="chess-board-wrapper">
					<div className="board-coordinates">
						<div className="rank-labels">
							{[8, 7, 6, 5, 4, 3, 2, 1].map(rank => (
								<span key={rank}>{rank}</span>
							))}
						</div>
						<div>
							<div className="chess-board">
								{board.map((row, rowIdx) =>
									row.map((piece, colIdx) => (
										<div
											key={`${rowIdx}-${colIdx}`}
											className={getSquareClasses(rowIdx, colIdx)}
											onClick={() => handleSquareClick(rowIdx, colIdx)}
										>
											{piece && (
												<span className={`chess-piece ${piece.color === WHITE ? 'white-piece' : 'black-piece'}`}>
													{PIECE_SYMBOLS[piece.color][piece.type]}
												</span>
											)}
										</div>
									))
								)}
							</div>
							<div className="file-labels">
								{['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(file => (
									<span key={file}>{file}</span>
								))}
							</div>
						</div>
					</div>

					<div className="chess-controls">
						<button className="chess-btn primary" onClick={resetGame}>New Game</button>
					</div>
				</div>

				<div className="chess-sidebar">
					<div className="captured-pieces">
						<h3>Captured</h3>
						<div className="captured-label">By White:</div>
						<div className="captured-row">
							{sortCaptured(capturedPieces.b).map((type, i) => (
								<span key={i}>{PIECE_SYMBOLS.b[type]}</span>
							))}
						</div>
						<div className="captured-label">By Black:</div>
						<div className="captured-row">
							{sortCaptured(capturedPieces.w).map((type, i) => (
								<span key={i}>{PIECE_SYMBOLS.w[type]}</span>
							))}
						</div>
					</div>

					<h3>Moves</h3>
					<div className="move-history" ref={moveHistoryRef}>
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

			{promotionPending && (
				<div className="promotion-overlay">
					<div className="promotion-dialog">
						<h3>Choose promotion piece</h3>
						<div className="promotion-options">
							{[QUEEN, ROOK, BISHOP, KNIGHT].map(type => (
								<div
									key={type}
									className="promotion-option"
									onClick={() => handlePromotion(type)}
								>
									{PIECE_SYMBOLS[turn][type]}
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
