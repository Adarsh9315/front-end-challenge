const boardEl = document.querySelector('.chess-board');
const turnIndicator = document.getElementById('turn-indicator');
const statusText = document.getElementById('status-text');
const moveList = document.getElementById('move-list');
const resetBtn = document.getElementById('reset-btn');
const undoBtn = document.getElementById('undo-btn');
const copyPgnBtn = document.getElementById('copy-pgn-btn');
const whiteCapturesEl = document.getElementById('white-captures');
const blackCapturesEl = document.getElementById('black-captures');

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const pieceSymbols = {
  P: '♙',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
  p: '♟︎',
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
};

const state = {
  board: [],
  isWhiteTurn: true,
  castling: {
    whiteKingSide: true,
    whiteQueenSide: true,
    blackKingSide: true,
    blackQueenSide: true,
  },
  enPassantTarget: null,
  halfMoveClock: 0,
  fullMoveNumber: 1,
  selected: null,
  legalMoves: [],
  moveHistory: [],
  captureHistory: [],
  historyStack: [],
};

const knightOffsets = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

const kingOffsets = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

function parseFen(fen) {
  const [piecePlacement, turn, castling, enPassant, halfMove, fullMove] = fen.split(' ');
  const rows = piecePlacement.split('/');
  state.board = rows.map((row) => {
    const cells = [];
    row.split('').forEach((char) => {
      if (Number.isInteger(Number(char))) {
        new Array(Number(char)).fill('').forEach(() => cells.push(''));
      } else {
        cells.push(char);
      }
    });
    return cells;
  });
  state.isWhiteTurn = turn === 'w';
  state.castling.whiteKingSide = castling.includes('K');
  state.castling.whiteQueenSide = castling.includes('Q');
  state.castling.blackKingSide = castling.includes('k');
  state.castling.blackQueenSide = castling.includes('q');
  state.enPassantTarget = enPassant === '-' ? null : enPassant;
  state.halfMoveClock = Number(halfMove);
  state.fullMoveNumber = Number(fullMove);
}

function boardToFen() {
  const position = state.board
    .map((row) => {
      let result = '';
      let empty = 0;
      row.forEach((cell) => {
        if (cell === '') {
          empty += 1;
        } else {
          if (empty > 0) {
            result += empty;
            empty = 0;
          }
          result += cell;
        }
      });
      if (empty > 0) result += empty;

      return result;
    })
    .join('/');

  const castling = [
    state.castling.whiteKingSide ? 'K' : '',
    state.castling.whiteQueenSide ? 'Q' : '',
    state.castling.blackKingSide ? 'k' : '',
    state.castling.blackQueenSide ? 'q' : '',
  ].join('');

  return `${position} ${state.isWhiteTurn ? 'w' : 'b'} ${castling || '-'} ${
    state.enPassantTarget || '-'
  } ${state.halfMoveClock} ${state.fullMoveNumber}`;
}

function renderBoard() {
  boardEl.innerHTML = '';
  state.board.forEach((row, rankIdx) => {
    row.forEach((piece, fileIdx) => {
      const square = document.createElement('button');
      square.classList.add('square', (rankIdx + fileIdx) % 2 === 0 ? 'light' : 'dark');
      square.dataset.rank = rankIdx;
      square.dataset.file = fileIdx;
      square.setAttribute('aria-label', coordsToNotation(rankIdx, fileIdx));
      square.textContent = pieceSymbols[piece] ?? '';
      boardEl.appendChild(square);
    });
  });
}

function coordsToNotation(rankIdx, fileIdx) {
  return `${files[fileIdx]}${ranks[rankIdx]}`;
}

function notationToCoords(notation) {
  const file = files.indexOf(notation[0]);
  const rank = ranks.indexOf(notation[1]);
  return [rank, file];
}

function isWhitePiece(piece) {
  return piece && piece === piece.toUpperCase();
}

function isOpponentPiece(piece, isWhite) {
  return piece && isWhitePiece(piece) !== isWhite;
}

function inBounds(rank, file) {
  return rank >= 0 && rank < 8 && file >= 0 && file < 8;
}

function cloneBoard(board) {
  return board.map((row) => row.slice());
}

function getLinearMoves(rank, file, directions) {
  const moves = [];
  directions.forEach(([dr, df]) => {
    let r = rank + dr;
    let f = file + df;
    while (inBounds(r, f)) {
      const target = state.board[r][f];
      if (!target) {
        moves.push([r, f]);
      } else {
        if (isOpponentPiece(target, state.isWhiteTurn)) {
          moves.push([r, f]);
        }
        break;
      }
      r += dr;
      f += df;
    }
  });
  return moves;
}

function getPawnMoves(rank, file, piece) {
  const moves = [];
  const direction = isWhitePiece(piece) ? -1 : 1;
  const startRank = isWhitePiece(piece) ? 6 : 1;
  const forwardRank = rank + direction;

  if (inBounds(forwardRank, file) && !state.board[forwardRank][file]) {
    moves.push([forwardRank, file]);
    if (rank === startRank) {
      const doubleRank = rank + direction * 2;
      if (!state.board[doubleRank][file]) {
        moves.push([doubleRank, file]);
      }
    }
  }

  [-1, 1].forEach((df) => {
    const captureRank = rank + direction;
    const captureFile = file + df;
    if (!inBounds(captureRank, captureFile)) return;
    const target = state.board[captureRank][captureFile];
    if (target && isOpponentPiece(target, state.isWhiteTurn)) {
      moves.push([captureRank, captureFile]);
    }
  });

  if (state.enPassantTarget) {
    const [targetRank, targetFile] = notationToCoords(state.enPassantTarget);
    if (targetRank === rank + direction && Math.abs(targetFile - file) === 1) {
      moves.push([targetRank, targetFile]);
    }
  }

  return moves;
}

function findKingPosition(isWhite) {
  for (let r = 0; r < 8; r += 1) {
    for (let f = 0; f < 8; f += 1) {
      const piece = state.board[r][f];
      if (piece && piece.toLowerCase() === 'k' && isWhitePiece(piece) === isWhite) {
        return [r, f];
      }
    }
  }
  return null;
}

function squareAttacked(rank, file, byWhite) {
  const originalTurn = state.isWhiteTurn;
  state.isWhiteTurn = byWhite;
  for (let r = 0; r < 8; r += 1) {
    for (let f = 0; f < 8; f += 1) {
      const piece = state.board[r][f];
      if (!piece || isWhitePiece(piece) !== byWhite) continue;
      const moves = pieceMoves(r, f, piece, true);
      if (moves.some(([mr, mf]) => mr === rank && mf === file)) {
        state.isWhiteTurn = originalTurn;
        return true;
      }
    }
  }
  state.isWhiteTurn = originalTurn;
  return false;
}

function pieceMoves(rank, file, piece, forAttack = false) {
  switch (piece.toLowerCase()) {
    case 'p':
      if (forAttack) {
        const direction = isWhitePiece(piece) ? -1 : 1;
        return [
          [rank + direction, file - 1],
          [rank + direction, file + 1],
        ].filter(([r, f]) => inBounds(r, f));
      }
      return getPawnMoves(rank, file, piece);
    case 'n':
      return knightOffsets
        .map(([dr, df]) => [rank + dr, file + df])
        .filter(([r, f]) => inBounds(r, f) && (!state.board[r][f] || isOpponentPiece(state.board[r][f], state.isWhiteTurn)));
    case 'b':
      return getLinearMoves(rank, file, [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]);
    case 'r':
      return getLinearMoves(rank, file, [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]);
    case 'q':
      return getLinearMoves(rank, file, [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]);
    case 'k':
      return kingOffsets
        .map(([dr, df]) => [rank + dr, file + df])
        .filter(([r, f]) => inBounds(r, f) && (!state.board[r][f] || isOpponentPiece(state.board[r][f], state.isWhiteTurn)));
    default:
      return [];
  }
}

function legalMovesWithCheckValidation(rank, file) {
  const piece = state.board[rank][file];
  const moves = pieceMoves(rank, file, piece);
  return moves.filter(([mr, mf]) => {
    const boardCopy = cloneBoard(state.board);
    const captured = boardCopy[mr][mf];
    boardCopy[mr][mf] = piece;
    boardCopy[rank][file] = '';

    const originalBoard = state.board;
    state.board = boardCopy;
    const kingPos = findKingPosition(state.isWhiteTurn);
    const kingInCheck = kingPos && squareAttacked(kingPos[0], kingPos[1], !state.isWhiteTurn);
    state.board = originalBoard;

    return !kingInCheck || captured === piece; // fallback to avoid undefined states
  });
}

function clearHighlights() {
  document
    .querySelectorAll('.square')
    .forEach((square) => square.classList.remove('highlight', 'move-option', 'capture-option'));
}

function highlightSquare(rank, file) {
  document
    .querySelector(`.square[data-rank="${rank}"][data-file="${file}"]`)
    ?.classList.add('highlight');
}

function highlightMoves(moves) {
  moves.forEach(([r, f]) => {
    const square = document.querySelector(`.square[data-rank="${r}"][data-file="${f}"]`);
    if (!square) return;
    if (state.board[r][f]) {
      square.classList.add('capture-option');
    } else {
      square.classList.add('move-option');
    }
  });
}

function createHistorySnapshot() {
  state.historyStack.push({
    board: cloneBoard(state.board),
    isWhiteTurn: state.isWhiteTurn,
    castling: { ...state.castling },
    enPassantTarget: state.enPassantTarget,
    halfMoveClock: state.halfMoveClock,
    fullMoveNumber: state.fullMoveNumber,
    moveHistory: state.moveHistory.slice(),
    captureHistory: state.captureHistory.slice(),
  });
}

function makeMove(start, end, options = {}) {
  const [sr, sf] = start;
  const [er, ef] = end;
  const piece = state.board[sr][sf];
  const target = state.board[er][ef];
  let capturedPiece = target;
  createHistorySnapshot();

  state.board[er][ef] = piece;
  state.board[sr][sf] = '';

  if (options.promotion) {
    state.board[er][ef] = state.isWhiteTurn ? options.promotion.toUpperCase() : options.promotion.toLowerCase();
  }

  if (piece.toLowerCase() === 'p' && coordsToNotation(er, ef) === state.enPassantTarget && !capturedPiece) {
    const captureRank = state.isWhiteTurn ? er + 1 : er - 1;
    capturedPiece = state.board[captureRank][ef];
    state.board[captureRank][ef] = '';
  }

  if (piece === 'K') {
    state.castling.whiteKingSide = false;
    state.castling.whiteQueenSide = false;
  }
  if (piece === 'k') {
    state.castling.blackKingSide = false;
    state.castling.blackQueenSide = false;
  }
  if (piece === 'R') {
    if (sr === 7 && sf === 0) state.castling.whiteQueenSide = false;
    if (sr === 7 && sf === 7) state.castling.whiteKingSide = false;
  }
  if (piece === 'r') {
    if (sr === 0 && sf === 0) state.castling.blackQueenSide = false;
    if (sr === 0 && sf === 7) state.castling.blackKingSide = false;
  }

  if (piece.toLowerCase() === 'p' && Math.abs(er - sr) === 2) {
    state.enPassantTarget = coordsToNotation((er + sr) / 2, ef);
  } else {
    state.enPassantTarget = null;
  }

  if (capturedPiece) {
    state.captureHistory.push({ color: state.isWhiteTurn ? 'white' : 'black', piece: capturedPiece });
  }

  const moveNotation = formatMove(start, end, piece, capturedPiece, options.promotion);
  state.moveHistory.push(moveNotation);
  updateMoveList();
  updateCaptures();

  state.isWhiteTurn = !state.isWhiteTurn;
  if (!state.isWhiteTurn) state.fullMoveNumber += 1;
  turnIndicator.textContent = state.isWhiteTurn ? 'White to move' : 'Black to move';
  statusText.textContent = 'Select a piece to highlight legal moves.';
}

function formatMove(start, end, piece, capturedPiece, promotionPiece) {
  const [sr, sf] = start;
  const [er, ef] = end;
  const pieceLetter = piece.toLowerCase() === 'p' ? '' : piece.toUpperCase();
  const captureSymbol = capturedPiece ? 'x' : '';
  const destination = coordsToNotation(er, ef);
  return `${pieceLetter}${captureSymbol}${destination}${promotionPiece ? `=${promotionPiece.toUpperCase()}` : ''}`;
}

function showPromotionDialog(isWhite, callback) {
  const template = document.getElementById('promotion-template');
  const overlay = template.content.firstElementChild.cloneNode(true);
  const optionsEl = overlay.querySelector('.promotion-options');
  const choices = ['q', 'r', 'b', 'n'];
  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.classList.add('promotion-option');
    btn.type = 'button';
    btn.textContent = pieceSymbols[isWhite ? choice.toUpperCase() : choice];
    btn.addEventListener('click', () => {
      overlay.remove();
      callback(choice);
    });
    optionsEl.appendChild(btn);
  });
  document.body.appendChild(overlay);
}

function handleSquareClick(event) {
  const square = event.target.closest('.square');
  if (!square) return;
  const rank = Number(square.dataset.rank);
  const file = Number(square.dataset.file);
  const piece = state.board[rank][file];

  if (state.selected && state.legalMoves.some(([r, f]) => r === rank && f === file)) {
    const isPromotionTarget =
      (state.board[state.selected[0]][state.selected[1]] === 'P' && rank === 0) ||
      (state.board[state.selected[0]][state.selected[1]] === 'p' && rank === 7);
    if (isPromotionTarget) {
      showPromotionDialog(state.isWhiteTurn, (choice) => {
        makeMove(state.selected, [rank, file], { promotion: choice });
        postMoveCleanup();
      });
    } else {
      makeMove(state.selected, [rank, file]);
      postMoveCleanup();
    }
    return;
  }

  if (piece && (state.isWhiteTurn ? isWhitePiece(piece) : !isWhitePiece(piece))) {
    state.selected = [rank, file];
    state.legalMoves = legalMovesWithCheckValidation(rank, file);
    clearHighlights();
    highlightSquare(rank, file);
    highlightMoves(state.legalMoves);
    statusText.textContent = state.legalMoves.length
      ? `Legal moves: ${state.legalMoves.map(([r, f]) => coordsToNotation(r, f)).join(', ')}`
      : 'No legal moves for this piece.';
  } else {
    state.selected = null;
    state.legalMoves = [];
    clearHighlights();
  }
}

function postMoveCleanup() {
  state.selected = null;
  state.legalMoves = [];
  clearHighlights();
  renderBoard();
}

function resetGame() {
  parseFen(initialFen);
  state.selected = null;
  state.legalMoves = [];
  state.moveHistory = [];
  state.captureHistory = [];
  state.historyStack = [];
  renderBoard();
  updateMoveList();
  updateCaptures();
  turnIndicator.textContent = 'White to move';
  statusText.textContent = 'Select a piece to highlight legal moves.';
}

function updateMoveList() {
  moveList.innerHTML = '';
  state.moveHistory.forEach((move, idx) => {
    if (idx % 2 === 0) {
      const whiteMove = move;
      const blackMove = state.moveHistory[idx + 1] ?? '';
      const li = document.createElement('li');
      li.textContent = `${Math.floor(idx / 2) + 1}. ${whiteMove} ${blackMove}`.trim();
      moveList.appendChild(li);
    }
  });
}

function updateCaptures() {
  const white = state.captureHistory.filter((c) => c.color === 'white');
  const black = state.captureHistory.filter((c) => c.color === 'black');
  whiteCapturesEl.textContent = white.map((c) => pieceSymbols[c.piece.toUpperCase()]).join(' ');
  blackCapturesEl.textContent = black.map((c) => pieceSymbols[c.piece]).join(' ');
}

function undoMove() {
  const snapshot = state.historyStack.pop();
  if (!snapshot) return;
  state.board = cloneBoard(snapshot.board);
  state.isWhiteTurn = snapshot.isWhiteTurn;
  state.castling = { ...snapshot.castling };
  state.enPassantTarget = snapshot.enPassantTarget;
  state.halfMoveClock = snapshot.halfMoveClock;
  state.fullMoveNumber = snapshot.fullMoveNumber;
  state.moveHistory = snapshot.moveHistory;
  state.captureHistory = snapshot.captureHistory;
  renderBoard();
  updateMoveList();
  updateCaptures();
  state.selected = null;
  state.legalMoves = [];
  clearHighlights();
  turnIndicator.textContent = state.isWhiteTurn ? 'White to move' : 'Black to move';
}

function copyPgn() {
  const moves = state.moveHistory.reduce((acc, move, idx) => {
    if (idx % 2 === 0) {
      const turn = Math.floor(idx / 2) + 1;
      acc.push(`${turn}. ${move} ${state.moveHistory[idx + 1] ?? ''}`.trim());
    }
    return acc;
  }, []);
  navigator.clipboard.writeText(moves.join(' ') || '').then(() => {
    statusText.textContent = 'PGN copied to clipboard.';
    setTimeout(() => {
      statusText.textContent = 'Select a piece to highlight legal moves.';
    }, 2000);
  });
}

boardEl.addEventListener('click', handleSquareClick);
resetBtn.addEventListener('click', resetGame);
undoBtn.addEventListener('click', undoMove);
copyPgnBtn.addEventListener('click', copyPgn);

resetGame();
