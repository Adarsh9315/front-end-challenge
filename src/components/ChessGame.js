import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ChessGame.css';

const PIECES = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

const initialBoard = () => [
  ['bR','bN','bB','bQ','bK','bB','bN','bR'],
  ['bP','bP','bP','bP','bP','bP','bP','bP'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['wP','wP','wP','wP','wP','wP','wP','wP'],
  ['wR','wN','wB','wQ','wK','wB','wN','wR'],
];

const cloneBoard = (board) => board.map(row => [...row]);

const getColor = (piece) => piece ? piece[0] : null;
const getType = (piece) => piece ? piece[1] : null;

const inBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

function getRawMoves(board, r, c, enPassantTarget, castlingRights) {
  const piece = board[r][c];
  if (!piece) return [];
  const color = getColor(piece);
  const type = getType(piece);
  const enemy = color === 'w' ? 'b' : 'w';
  const moves = [];

  const addIfValid = (nr, nc) => {
    if (inBounds(nr, nc) && getColor(board[nr][nc]) !== color) {
      moves.push([nr, nc]);
    }
  };

  const addSliding = (dirs) => {
    for (const [dr, dc] of dirs) {
      let nr = r + dr, nc = c + dc;
      while (inBounds(nr, nc)) {
        if (board[nr][nc]) {
          if (getColor(board[nr][nc]) === enemy) moves.push([nr, nc]);
          break;
        }
        moves.push([nr, nc]);
        nr += dr;
        nc += dc;
      }
    }
  };

  switch (type) {
    case 'P': {
      const dir = color === 'w' ? -1 : 1;
      const startRow = color === 'w' ? 6 : 1;
      // Forward
      if (inBounds(r + dir, c) && !board[r + dir][c]) {
        moves.push([r + dir, c]);
        if (r === startRow && !board[r + 2 * dir][c]) {
          moves.push([r + 2 * dir, c]);
        }
      }
      // Captures
      for (const dc of [-1, 1]) {
        const nr = r + dir, nc = c + dc;
        if (inBounds(nr, nc)) {
          if (board[nr][nc] && getColor(board[nr][nc]) === enemy) {
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
    case 'N':
      for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
        addIfValid(r + dr, c + dc);
      }
      break;
    case 'B':
      addSliding([[-1,-1],[-1,1],[1,-1],[1,1]]);
      break;
    case 'R':
      addSliding([[-1,0],[1,0],[0,-1],[0,1]]);
      break;
    case 'Q':
      addSliding([[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]);
      break;
    case 'K': {
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
        addIfValid(r + dr, c + dc);
      }
      // Castling
      if (castlingRights) {
        const row = color === 'w' ? 7 : 0;
        if (r === row && c === 4) {
          // Kingside
          if (castlingRights[color + 'K'] &&
              !board[row][5] && !board[row][6] &&
              board[row][7] === color + 'R') {
            if (!isSquareAttacked(board, row, 4, enemy) &&
                !isSquareAttacked(board, row, 5, enemy) &&
                !isSquareAttacked(board, row, 6, enemy)) {
              moves.push([row, 6]);
            }
          }
          // Queenside
          if (castlingRights[color + 'Q'] &&
              !board[row][3] && !board[row][2] && !board[row][1] &&
              board[row][0] === color + 'R') {
            if (!isSquareAttacked(board, row, 4, enemy) &&
                !isSquareAttacked(board, row, 3, enemy) &&
                !isSquareAttacked(board, row, 2, enemy)) {
              moves.push([row, 2]);
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
}

function isSquareAttacked(board, r, c, byColor) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && getColor(piece) === byColor) {
        const moves = getRawMoves(board, row, col, null, null);
        if (moves.some(([mr, mc]) => mr === r && mc === c)) {
          return true;
        }
      }
    }
  }
  return false;
}

function isInCheck(board, color) {
  const enemy = color === 'w' ? 'b' : 'w';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === color + 'K') {
        return isSquareAttacked(board, r, c, enemy);
      }
    }
  }
  return false;
}

function getLegalMoves(board, r, c, enPassantTarget, castlingRights) {
  const piece = board[r][c];
  if (!piece) return [];
  const color = getColor(piece);
  const raw = getRawMoves(board, r, c, enPassantTarget, castlingRights);
  const legal = [];

  for (const [nr, nc] of raw) {
    const newBoard = cloneBoard(board);
    // En passant capture
    if (getType(piece) === 'P' && enPassantTarget &&
        nr === enPassantTarget[0] && nc === enPassantTarget[1] && !board[nr][nc]) {
      const capturedRow = color === 'w' ? nr + 1 : nr - 1;
      newBoard[capturedRow][nc] = null;
    }
    // Castling rook move
    if (getType(piece) === 'K' && Math.abs(nc - c) === 2) {
      const row = r;
      if (nc === 6) { newBoard[row][5] = newBoard[row][7]; newBoard[row][7] = null; }
      if (nc === 2) { newBoard[row][3] = newBoard[row][0]; newBoard[row][0] = null; }
    }
    newBoard[nr][nc] = piece;
    newBoard[r][c] = null;
    if (!isInCheck(newBoard, color)) {
      legal.push([nr, nc]);
    }
  }
  return legal;
}

function hasAnyLegalMoves(board, color, enPassantTarget, castlingRights) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] && getColor(board[r][c]) === color) {
        if (getLegalMoves(board, r, c, enPassantTarget, castlingRights).length > 0) {
          return true;
        }
      }
    }
  }
  return false;
}

function toAlgebraic(r, c) {
  return String.fromCharCode(97 + c) + (8 - r);
}

const ChessGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('w');
  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [moveHistory, setMoveHistory] = useState([]);
  const [captured, setCaptured] = useState({ w: [], b: [] });
  const [enPassantTarget, setEnPassantTarget] = useState(null);
  const [castlingRights, setCastlingRights] = useState({
    wK: true, wQ: true, bK: true, bQ: true,
  });
  const [promotionPending, setPromotionPending] = useState(null);
  const [lastMove, setLastMove] = useState(null);

  const resetGame = useCallback(() => {
    setBoard(initialBoard());
    setTurn('w');
    setSelected(null);
    setLegalMoves([]);
    setGameStatus('playing');
    setMoveHistory([]);
    setCaptured({ w: [], b: [] });
    setEnPassantTarget(null);
    setCastlingRights({ wK: true, wQ: true, bK: true, bQ: true });
    setPromotionPending(null);
    setLastMove(null);
  }, []);

  const handlePromotion = (pieceType) => {
    if (!promotionPending) return;
    const { newBoard, r, c, color, from, capturedPiece } = promotionPending;
    const promotedPiece = color + pieceType;
    newBoard[r][c] = promotedPiece;

    const newCaptured = { ...captured };
    if (capturedPiece) {
      newCaptured[getColor(capturedPiece)] = [...newCaptured[getColor(capturedPiece)], capturedPiece];
    }

    const moveStr = `${toAlgebraic(from[0], from[1])}-${toAlgebraic(r, c)}=${pieceType}`;

    setBoard(newBoard);
    setCaptured(newCaptured);
    setMoveHistory([...moveHistory, moveStr]);
    setPromotionPending(null);
    setSelected(null);
    setLegalMoves([]);
    setLastMove({ from, to: [r, c] });

    const nextTurn = color === 'w' ? 'b' : 'w';
    setTurn(nextTurn);

    if (!hasAnyLegalMoves(newBoard, nextTurn, null, castlingRights)) {
      if (isInCheck(newBoard, nextTurn)) {
        setGameStatus(color === 'w' ? 'white-wins' : 'black-wins');
      } else {
        setGameStatus('stalemate');
      }
    } else if (isInCheck(newBoard, nextTurn)) {
      setGameStatus('check');
    } else {
      setGameStatus('playing');
    }
  };

  const handleSquareClick = (r, c) => {
    if (gameStatus === 'white-wins' || gameStatus === 'black-wins' || gameStatus === 'stalemate') return;
    if (promotionPending) return;

    const piece = board[r][c];

    // If clicking on own piece, select it
    if (piece && getColor(piece) === turn) {
      setSelected([r, c]);
      setLegalMoves(getLegalMoves(board, r, c, enPassantTarget, castlingRights));
      return;
    }

    // If a piece is selected and clicking a legal move target
    if (selected) {
      const isLegal = legalMoves.some(([mr, mc]) => mr === r && mc === c);
      if (isLegal) {
        const [sr, sc] = selected;
        const movingPiece = board[sr][sc];
        const newBoard = cloneBoard(board);
        const color = getColor(movingPiece);
        const type = getType(movingPiece);
        let capturedPiece = board[r][c];
        let newEnPassant = null;
        const newCastling = { ...castlingRights };

        // En passant capture
        if (type === 'P' && enPassantTarget &&
            r === enPassantTarget[0] && c === enPassantTarget[1] && !board[r][c]) {
          const capturedRow = color === 'w' ? r + 1 : r - 1;
          capturedPiece = newBoard[capturedRow][c];
          newBoard[capturedRow][c] = null;
        }

        // Castling
        if (type === 'K' && Math.abs(c - sc) === 2) {
          if (c === 6) { newBoard[r][5] = newBoard[r][7]; newBoard[r][7] = null; }
          if (c === 2) { newBoard[r][3] = newBoard[r][0]; newBoard[r][0] = null; }
        }

        // Pawn double push -> set en passant target
        if (type === 'P' && Math.abs(r - sr) === 2) {
          newEnPassant = [(sr + r) / 2, c];
        }

        // Update castling rights
        if (type === 'K') {
          newCastling[color + 'K'] = false;
          newCastling[color + 'Q'] = false;
        }
        if (type === 'R') {
          if (sc === 0) newCastling[color + 'Q'] = false;
          if (sc === 7) newCastling[color + 'K'] = false;
        }
        // If a rook is captured
        if (capturedPiece && getType(capturedPiece) === 'R') {
          const capColor = getColor(capturedPiece);
          if (r === (capColor === 'w' ? 7 : 0)) {
            if (c === 0) newCastling[capColor + 'Q'] = false;
            if (c === 7) newCastling[capColor + 'K'] = false;
          }
        }

        newBoard[r][c] = movingPiece;
        newBoard[sr][sc] = null;

        // Pawn promotion
        const promoRow = color === 'w' ? 0 : 7;
        if (type === 'P' && r === promoRow) {
          setPromotionPending({
            newBoard, r, c, color,
            from: [sr, sc],
            capturedPiece,
          });
          setBoard(newBoard);
          setCastlingRights(newCastling);
          setEnPassantTarget(newEnPassant);
          return;
        }

        const newCaptured = { ...captured };
        if (capturedPiece) {
          newCaptured[getColor(capturedPiece)] = [...newCaptured[getColor(capturedPiece)], capturedPiece];
        }

        const moveStr = `${PIECES[movingPiece]}${toAlgebraic(sr, sc)}-${toAlgebraic(r, c)}${capturedPiece ? 'x' + PIECES[capturedPiece] : ''}`;

        setBoard(newBoard);
        setCaptured(newCaptured);
        setMoveHistory(prev => [...prev, moveStr]);
        setSelected(null);
        setLegalMoves([]);
        setCastlingRights(newCastling);
        setEnPassantTarget(newEnPassant);
        setLastMove({ from: [sr, sc], to: [r, c] });

        const nextTurn = color === 'w' ? 'b' : 'w';
        setTurn(nextTurn);

        if (!hasAnyLegalMoves(newBoard, nextTurn, newEnPassant, newCastling)) {
          if (isInCheck(newBoard, nextTurn)) {
            setGameStatus(color === 'w' ? 'white-wins' : 'black-wins');
          } else {
            setGameStatus('stalemate');
          }
        } else if (isInCheck(newBoard, nextTurn)) {
          setGameStatus('check');
        } else {
          setGameStatus('playing');
        }
      } else {
        setSelected(null);
        setLegalMoves([]);
      }
    }
  };

  const isHighlighted = (r, c) => legalMoves.some(([mr, mc]) => mr === r && mc === c);
  const isSelected = (r, c) => selected && selected[0] === r && selected[1] === c;
  const isLastMoveSquare = (r, c) =>
    lastMove && ((lastMove.from[0] === r && lastMove.from[1] === c) ||
                 (lastMove.to[0] === r && lastMove.to[1] === c));

  const statusText = () => {
    switch (gameStatus) {
      case 'white-wins': return 'Checkmate — White wins!';
      case 'black-wins': return 'Checkmate — Black wins!';
      case 'stalemate': return 'Stalemate — Draw!';
      case 'check': return `${turn === 'w' ? 'White' : 'Black'} is in check!`;
      default: return `${turn === 'w' ? 'White' : 'Black'} to move`;
    }
  };

  const gameOver = gameStatus === 'white-wins' || gameStatus === 'black-wins' || gameStatus === 'stalemate';

  return (
    <div className="chess-page">
      <div className="chess-header">
        <Link to="/" className="chess-back-link">← Back to Movies</Link>
        <h1 className="chess-title">Chess</h1>
      </div>

      <div className="chess-layout">
        <div className="chess-sidebar chess-sidebar-left">
          <div className="captured-section">
            <h3>Captured by White</h3>
            <div className="captured-pieces">
              {captured.b.map((p, i) => <span key={i} className="captured-piece">{PIECES[p]}</span>)}
              {captured.b.length === 0 && <span className="no-captures">—</span>}
            </div>
          </div>
          <div className="captured-section">
            <h3>Captured by Black</h3>
            <div className="captured-pieces">
              {captured.w.map((p, i) => <span key={i} className="captured-piece">{PIECES[p]}</span>)}
              {captured.w.length === 0 && <span className="no-captures">—</span>}
            </div>
          </div>
        </div>

        <div className="chess-board-container">
          <div className={`chess-status ${gameOver ? 'game-over' : ''} ${gameStatus === 'check' ? 'in-check' : ''}`}>
            {statusText()}
          </div>

          {promotionPending && (
            <div className="promotion-overlay">
              <div className="promotion-dialog">
                <p>Promote pawn to:</p>
                <div className="promotion-options">
                  {['Q', 'R', 'B', 'N'].map(pt => (
                    <button key={pt} className="promotion-btn" onClick={() => handlePromotion(pt)}>
                      {PIECES[promotionPending.color + pt]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="chess-board">
            {board.map((row, r) => (
              <div key={r} className="chess-row">
                <span className="rank-label">{8 - r}</span>
                {row.map((piece, c) => {
                  const isDark = (r + c) % 2 === 1;
                  let squareClass = `chess-square ${isDark ? 'dark' : 'light'}`;
                  if (isSelected(r, c)) squareClass += ' selected';
                  if (isHighlighted(r, c)) squareClass += piece ? ' capture-highlight' : ' move-highlight';
                  if (isLastMoveSquare(r, c)) squareClass += ' last-move';

                  return (
                    <div
                      key={c}
                      className={squareClass}
                      onClick={() => handleSquareClick(r, c)}
                    >
                      {piece && <span className={`chess-piece ${getColor(piece)}-piece`}>{PIECES[piece]}</span>}
                      {isHighlighted(r, c) && !piece && <span className="move-dot"></span>}
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="file-labels">
              <span className="file-spacer"></span>
              {['a','b','c','d','e','f','g','h'].map(f => (
                <span key={f} className="file-label">{f}</span>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={resetGame}>New Game</button>
        </div>

        <div className="chess-sidebar chess-sidebar-right">
          <h3>Move History</h3>
          <div className="move-history">
            {moveHistory.length === 0 && <span className="no-moves">No moves yet</span>}
            {moveHistory.map((move, i) => (
              <div key={i} className={`move-entry ${i % 2 === 0 ? 'white-move' : 'black-move'}`}>
                {i % 2 === 0 && <span className="move-number">{Math.floor(i / 2) + 1}.</span>}
                <span className="move-text">{move}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
