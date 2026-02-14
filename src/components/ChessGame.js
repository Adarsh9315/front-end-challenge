import React, { useState, useCallback, useMemo } from 'react';

// Piece constants
const PIECES = {
	wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
	bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

const PIECE_NAMES = {
	K: 'King', Q: 'Queen', R: 'Rook', B: 'Bishop', N: 'Knight', P: 'Pawn',
};

const colLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function createInitialBoard() {
	const board = Array(8).fill(null).map(() => Array(8).fill(null));
	// Black pieces (top)
	board[0] = ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'];
	board[1] = Array(8).fill('bP');
	// White pieces (bottom)
	board[6] = Array(8).fill('wP');
	board[7] = ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'];
	return board;
}

function cloneBoard(board) {
	return board.map(row => [...row]);
}

function getColor(piece) {
	if (!piece) return null;
	return piece[0]; // 'w' or 'b'
}

function getType(piece) {
	if (!piece) return null;
	return piece[1]; // K, Q, R, B, N, P
}

function isInBounds(r, c) {
	return r >= 0 && r < 8 && c >= 0 && c < 8;
}

// Find king position for a given color
function findKing(board, color) {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			if (board[r][c] === color + 'K') return [r, c];
		}
	}
	return null;
}

// Generate pseudo-legal moves for a piece (ignoring check)
function getPseudoMoves(board, r, c, castlingRights, enPassantTarget) {
	const piece = board[r][c];
	if (!piece) return [];
	const color = getColor(piece);
	const type = getType(piece);
	const moves = [];
	const enemy = color === 'w' ? 'b' : 'w';

	const addMove = (tr, tc) => {
		if (isInBounds(tr, tc)) {
			const target = board[tr][tc];
			if (!target || getColor(target) === enemy) {
				moves.push([tr, tc]);
				return !target; // continue sliding if empty
			}
		}
		return false;
	};

	const slide = (dirs) => {
		for (const [dr, dc] of dirs) {
			for (let i = 1; i < 8; i++) {
				if (!addMove(r + dr * i, c + dc * i)) break;
			}
		}
	};

	switch (type) {
		case 'P': {
			const dir = color === 'w' ? -1 : 1;
			const startRow = color === 'w' ? 6 : 1;
			// Forward
			if (isInBounds(r + dir, c) && !board[r + dir][c]) {
				moves.push([r + dir, c]);
				// Double push
				if (r === startRow && !board[r + 2 * dir][c]) {
					moves.push([r + 2 * dir, c]);
				}
			}
			// Captures
			for (const dc of [-1, 1]) {
				const tr = r + dir;
				const tc = c + dc;
				if (isInBounds(tr, tc)) {
					if (board[tr][tc] && getColor(board[tr][tc]) === enemy) {
						moves.push([tr, tc]);
					}
					// En passant
					if (enPassantTarget && enPassantTarget[0] === tr && enPassantTarget[1] === tc) {
						moves.push([tr, tc]);
					}
				}
			}
			break;
		}
		case 'N': {
			const knightMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
			for (const [dr, dc] of knightMoves) addMove(r + dr, c + dc);
			break;
		}
		case 'B':
			slide([[-1,-1],[-1,1],[1,-1],[1,1]]);
			break;
		case 'R':
			slide([[-1,0],[1,0],[0,-1],[0,1]]);
			break;
		case 'Q':
			slide([[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]);
			break;
		case 'K': {
			const kingMoves = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
			for (const [dr, dc] of kingMoves) addMove(r + dr, c + dc);
			// Castling
			if (castlingRights) {
				const row = color === 'w' ? 7 : 0;
				if (r === row && c === 4) {
					// Kingside
					const ksKey = color === 'w' ? 'wK' : 'bK';
					if (castlingRights[ksKey] && !board[row][5] && !board[row][6] && board[row][7] === color + 'R') {
						moves.push([row, 6]);
					}
					// Queenside
					const qsKey = color === 'w' ? 'wQ' : 'bQ';
					if (castlingRights[qsKey] && !board[row][3] && !board[row][2] && !board[row][1] && board[row][0] === color + 'R') {
						moves.push([row, 2]);
					}
				}
			}
			break;
		}
		default:
			break;
	}
	return moves;
}

// Check if a square is attacked by the given color
function isSquareAttacked(board, r, c, byColor) {
	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			const piece = board[row][col];
			if (piece && getColor(piece) === byColor) {
				const moves = getPseudoMoves(board, row, col, null, null);
				if (moves.some(([mr, mc]) => mr === r && mc === c)) {
					return true;
				}
			}
		}
	}
	return false;
}

function isInCheck(board, color) {
	const king = findKing(board, color);
	if (!king) return false;
	const enemy = color === 'w' ? 'b' : 'w';
	return isSquareAttacked(board, king[0], king[1], enemy);
}

// Get legal moves for a piece at (r, c)
function getLegalMoves(board, r, c, castlingRights, enPassantTarget) {
	const piece = board[r][c];
	if (!piece) return [];
	const color = getColor(piece);
	const type = getType(piece);
	const pseudoMoves = getPseudoMoves(board, r, c, castlingRights, enPassantTarget);
	const legalMoves = [];
	const enemy = color === 'w' ? 'b' : 'w';

	for (const [tr, tc] of pseudoMoves) {
		// Castling: check that king doesn't pass through or land in check
		if (type === 'K' && Math.abs(tc - c) === 2) {
			const row = r;
			if (isInCheck(board, color)) continue; // can't castle out of check
			const dir = tc > c ? 1 : -1;
			const midCol = c + dir;
			if (isSquareAttacked(board, row, midCol, enemy)) continue;
			if (isSquareAttacked(board, row, tc, enemy)) continue;
			legalMoves.push([tr, tc]);
			continue;
		}

		// Simulate the move
		const newBoard = cloneBoard(board);
		// En passant capture
		if (type === 'P' && enPassantTarget && tr === enPassantTarget[0] && tc === enPassantTarget[1]) {
			const capturedRow = color === 'w' ? tr + 1 : tr - 1;
			newBoard[capturedRow][tc] = null;
		}
		newBoard[tr][tc] = piece;
		newBoard[r][c] = null;

		// Check if own king is in check after move
		if (!isInCheck(newBoard, color)) {
			legalMoves.push([tr, tc]);
		}
	}
	return legalMoves;
}

// Check if a player has any legal moves
function hasLegalMoves(board, color, castlingRights, enPassantTarget) {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			if (board[r][c] && getColor(board[r][c]) === color) {
				if (getLegalMoves(board, r, c, castlingRights, enPassantTarget).length > 0) {
					return true;
				}
			}
		}
	}
	return false;
}

// Check for insufficient material
function isInsufficientMaterial(board) {
	const pieces = [];
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			if (board[r][c]) {
				pieces.push({ piece: board[r][c], r, c });
			}
		}
	}
	// King vs King
	if (pieces.length === 2) return true;
	// King + Bishop vs King or King + Knight vs King
	if (pieces.length === 3) {
		const nonKing = pieces.find(p => getType(p.piece) !== 'K');
		if (nonKing && (getType(nonKing.piece) === 'B' || getType(nonKing.piece) === 'N')) {
			return true;
		}
	}
	// King + Bishop vs King + Bishop (same color bishops)
	if (pieces.length === 4) {
		const bishops = pieces.filter(p => getType(p.piece) === 'B');
		if (bishops.length === 2) {
			const color1 = (bishops[0].r + bishops[0].c) % 2;
			const color2 = (bishops[1].r + bishops[1].c) % 2;
			if (color1 === color2) return true;
		}
	}
	return false;
}

function toAlgebraic(r, c) {
	return colLabels[c] + (8 - r);
}

const ChessGame = () => {
	const [board, setBoard] = useState(createInitialBoard);
	const [turn, setTurn] = useState('w');
	const [selected, setSelected] = useState(null);
	const [legalMovesForSelected, setLegalMovesForSelected] = useState([]);
	const [castlingRights, setCastlingRights] = useState({
		wK: true, wQ: true, bK: true, bQ: true,
	});
	const [enPassantTarget, setEnPassantTarget] = useState(null);
	const [moveHistory, setMoveHistory] = useState([]);
	const [gameStatus, setGameStatus] = useState('playing'); // playing, check, checkmate, stalemate, draw
	const [lastMove, setLastMove] = useState(null);
	const [promotionPending, setPromotionPending] = useState(null);

	const handleNewGame = useCallback(() => {
		setBoard(createInitialBoard());
		setTurn('w');
		setSelected(null);
		setLegalMovesForSelected([]);
		setCastlingRights({ wK: true, wQ: true, bK: true, bQ: true });
		setEnPassantTarget(null);
		setMoveHistory([]);
		setGameStatus('playing');
		setLastMove(null);
		setPromotionPending(null);
	}, []);

	const executeMove = useCallback((fromR, fromC, toR, toC, promotionPiece) => {
		const newBoard = cloneBoard(board);
		const piece = newBoard[fromR][fromC];
		const color = getColor(piece);
		const type = getType(piece);
		const captured = newBoard[toR][toC];
		const enemy = color === 'w' ? 'b' : 'w';
		let moveNotation = '';

		// Build move notation
		const fromSq = toAlgebraic(fromR, fromC);
		const toSq = toAlgebraic(toR, toC);

		// En passant capture
		let isEnPassant = false;
		if (type === 'P' && enPassantTarget && toR === enPassantTarget[0] && toC === enPassantTarget[1]) {
			const capturedRow = color === 'w' ? toR + 1 : toR - 1;
			newBoard[capturedRow][toC] = null;
			isEnPassant = true;
		}

		// Castling
		let isCastling = false;
		if (type === 'K' && Math.abs(toC - fromC) === 2) {
			isCastling = true;
			if (toC === 6) {
				// Kingside
				newBoard[fromR][5] = newBoard[fromR][7];
				newBoard[fromR][7] = null;
				moveNotation = 'O-O';
			} else {
				// Queenside
				newBoard[fromR][3] = newBoard[fromR][0];
				newBoard[fromR][0] = null;
				moveNotation = 'O-O-O';
			}
		}

		// Move piece
		newBoard[toR][toC] = piece;
		newBoard[fromR][fromC] = null;

		// Pawn promotion
		if (type === 'P' && (toR === 0 || toR === 7)) {
			const promoPiece = promotionPiece || 'Q';
			newBoard[toR][toC] = color + promoPiece;
		}

		// Build notation if not castling
		if (!isCastling) {
			if (type === 'P') {
				if (captured || isEnPassant) {
					moveNotation = colLabels[fromC] + 'x' + toSq;
				} else {
					moveNotation = toSq;
				}
				if (toR === 0 || toR === 7) {
					moveNotation += '=' + (promotionPiece || 'Q');
				}
			} else {
				moveNotation = type;
				if (captured) moveNotation += 'x';
				moveNotation += toSq;
			}
		}

		// Update castling rights
		const newCastling = { ...castlingRights };
		if (type === 'K') {
			if (color === 'w') { newCastling.wK = false; newCastling.wQ = false; }
			else { newCastling.bK = false; newCastling.bQ = false; }
		}
		if (type === 'R') {
			if (fromR === 7 && fromC === 0) newCastling.wQ = false;
			if (fromR === 7 && fromC === 7) newCastling.wK = false;
			if (fromR === 0 && fromC === 0) newCastling.bQ = false;
			if (fromR === 0 && fromC === 7) newCastling.bK = false;
		}
		// If rook captured
		if (toR === 7 && toC === 0) newCastling.wQ = false;
		if (toR === 7 && toC === 7) newCastling.wK = false;
		if (toR === 0 && toC === 0) newCastling.bQ = false;
		if (toR === 0 && toC === 7) newCastling.bK = false;

		// Update en passant target
		let newEnPassant = null;
		if (type === 'P' && Math.abs(toR - fromR) === 2) {
			newEnPassant = [(fromR + toR) / 2, fromC];
		}

		// Check game state
		const inCheck = isInCheck(newBoard, enemy);
		const hasMovesLeft = hasLegalMoves(newBoard, enemy, newCastling, newEnPassant);

		if (inCheck && !hasMovesLeft) {
			moveNotation += '#';
			setGameStatus('checkmate');
		} else if (inCheck) {
			moveNotation += '+';
			setGameStatus('check');
		} else if (!hasMovesLeft) {
			setGameStatus('stalemate');
		} else if (isInsufficientMaterial(newBoard)) {
			setGameStatus('draw');
		} else {
			setGameStatus('playing');
		}

		setBoard(newBoard);
		setCastlingRights(newCastling);
		setEnPassantTarget(newEnPassant);
		setTurn(enemy);
		setSelected(null);
		setLegalMovesForSelected([]);
		setLastMove({ from: [fromR, fromC], to: [toR, toC] });
		setMoveHistory(prev => [...prev, {
			notation: moveNotation,
			from: fromSq,
			to: toSq,
			color,
		}]);
	}, [board, castlingRights, enPassantTarget]);

	const handleSquareClick = useCallback((r, c) => {
		if (gameStatus === 'checkmate' || gameStatus === 'stalemate' || gameStatus === 'draw') return;
		if (promotionPending) return;

		const piece = board[r][c];

		if (selected) {
			const [sr, sc] = selected;
			// Check if clicking on own piece to reselect
			if (piece && getColor(piece) === turn) {
				const moves = getLegalMoves(board, r, c, castlingRights, enPassantTarget);
				setSelected([r, c]);
				setLegalMovesForSelected(moves);
				return;
			}

			// Check if this is a legal move
			const isLegal = legalMovesForSelected.some(([mr, mc]) => mr === r && mc === c);
			if (isLegal) {
				const movingPiece = board[sr][sc];
				// Check for pawn promotion
				if (getType(movingPiece) === 'P' && (r === 0 || r === 7)) {
					setPromotionPending({ fromR: sr, fromC: sc, toR: r, toC: c });
					return;
				}
				executeMove(sr, sc, r, c, null);
			} else {
				setSelected(null);
				setLegalMovesForSelected([]);
			}
		} else {
			if (piece && getColor(piece) === turn) {
				const moves = getLegalMoves(board, r, c, castlingRights, enPassantTarget);
				setSelected([r, c]);
				setLegalMovesForSelected(moves);
			}
		}
	}, [board, turn, selected, legalMovesForSelected, castlingRights, enPassantTarget, gameStatus, promotionPending, executeMove]);

	const handlePromotion = useCallback((pieceType) => {
		if (!promotionPending) return;
		const { fromR, fromC, toR, toC } = promotionPending;
		setPromotionPending(null);
		executeMove(fromR, fromC, toR, toC, pieceType);
	}, [promotionPending, executeMove]);

	const statusMessage = useMemo(() => {
		const colorName = turn === 'w' ? 'White' : 'Black';
		const enemyName = turn === 'w' ? 'Black' : 'White';
		switch (gameStatus) {
			case 'checkmate':
				return `Checkmate! ${enemyName} wins!`;
			case 'stalemate':
				return 'Stalemate! Draw.';
			case 'draw':
				return 'Draw — Insufficient material.';
			case 'check':
				return `${colorName} is in check!`;
			default:
				return `${colorName}'s turn`;
		}
	}, [turn, gameStatus]);

	const formattedMoves = useMemo(() => {
		const pairs = [];
		for (let i = 0; i < moveHistory.length; i += 2) {
			pairs.push({
				num: Math.floor(i / 2) + 1,
				white: moveHistory[i]?.notation || '',
				black: moveHistory[i + 1]?.notation || '',
			});
		}
		return pairs;
	}, [moveHistory]);

	const isGameOver = gameStatus === 'checkmate' || gameStatus === 'stalemate' || gameStatus === 'draw';

	return (
		<div className="chess-page">
			<div className="chess-container">
				<div className="chess-board-section">
					<div className="chess-status-bar">
						<span className={`chess-status ${gameStatus}`}>{statusMessage}</span>
					</div>
					<div className="chess-board-wrapper">
						<div className="chess-col-labels top">
							{colLabels.map(l => <span key={l} className="chess-label">{l}</span>)}
						</div>
						<div className="chess-board-with-rows">
							<div className="chess-row-labels">
								{[8,7,6,5,4,3,2,1].map(n => <span key={n} className="chess-label">{n}</span>)}
							</div>
							<div className="chess-board">
								{board.map((row, r) =>
									row.map((piece, c) => {
										const isLight = (r + c) % 2 === 0;
										const isSelected = selected && selected[0] === r && selected[1] === c;
										const isLegalTarget = legalMovesForSelected.some(([mr, mc]) => mr === r && mc === c);
										const isLastFrom = lastMove && lastMove.from[0] === r && lastMove.from[1] === c;
										const isLastTo = lastMove && lastMove.to[0] === r && lastMove.to[1] === c;
										const hasPiece = !!piece;

										let className = 'chess-square';
										className += isLight ? ' light' : ' dark';
										if (isSelected) className += ' selected';
										if (isLastFrom || isLastTo) className += ' last-move';

										return (
											<div
												key={`${r}-${c}`}
												className={className}
												onClick={() => handleSquareClick(r, c)}
											>
												{isLegalTarget && (
													<span className={`legal-move-dot ${hasPiece ? 'capture' : ''}`} />
												)}
												{piece && (
													<span className={`chess-piece ${getColor(piece) === 'w' ? 'white-piece' : 'black-piece'}`}>
														{PIECES[piece]}
													</span>
												)}
											</div>
										);
									})
								)}
							</div>
							<div className="chess-row-labels right">
								{[8,7,6,5,4,3,2,1].map(n => <span key={n} className="chess-label">{n}</span>)}
							</div>
						</div>
						<div className="chess-col-labels bottom">
							{colLabels.map(l => <span key={l} className="chess-label">{l}</span>)}
						</div>
					</div>

					{promotionPending && (
						<div className="promotion-overlay">
							<div className="promotion-dialog">
								<p>Promote pawn to:</p>
								<div className="promotion-options">
									{['Q', 'R', 'B', 'N'].map(pt => (
										<button
											key={pt}
											className="promotion-btn"
											onClick={() => handlePromotion(pt)}
											title={PIECE_NAMES[pt]}
										>
											{PIECES[turn + pt]}
										</button>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="chess-sidebar">
					<div className="chess-sidebar-header">
						<h3>Chess</h3>
						<button className="chess-new-game-btn" onClick={handleNewGame}>
							New Game
						</button>
					</div>

					<div className="chess-turn-indicator">
						<span className={`turn-dot ${turn === 'w' ? 'white' : 'black'}`} />
						<span>{turn === 'w' ? 'White' : 'Black'} to move</span>
					</div>

					{isGameOver && (
						<div className="chess-game-over-banner">
							{statusMessage}
						</div>
					)}

					<div className="chess-move-history">
						<h4>Moves</h4>
						<div className="move-list">
							{formattedMoves.length === 0 && (
								<p className="no-moves">No moves yet. White starts.</p>
							)}
							{formattedMoves.map(({ num, white, black }) => (
								<div key={num} className="move-row">
									<span className="move-num">{num}.</span>
									<span className="move-white">{white}</span>
									<span className="move-black">{black}</span>
								</div>
							))}
						</div>
					</div>

					<div className="chess-captured-info">
						<h4>How to Play</h4>
						<ul className="chess-instructions">
							<li>Click a piece to select it</li>
							<li>Green dots show legal moves</li>
							<li>Click a dot to move there</li>
							<li>Includes castling, en passant, and promotion</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChessGame;
