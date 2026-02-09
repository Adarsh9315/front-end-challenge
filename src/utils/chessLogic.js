// Chess piece types
export const PIECES = {
  PAWN: 'pawn',
  ROOK: 'rook',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  QUEEN: 'queen',
  KING: 'king'
};

export const COLORS = {
  WHITE: 'white',
  BLACK: 'black'
};

// Initialize chess board
export const initializeBoard = () => {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: PIECES.PAWN, color: COLORS.BLACK };
    board[6][i] = { type: PIECES.PAWN, color: COLORS.WHITE };
  }
  
  // Place rooks
  board[0][0] = { type: PIECES.ROOK, color: COLORS.BLACK };
  board[0][7] = { type: PIECES.ROOK, color: COLORS.BLACK };
  board[7][0] = { type: PIECES.ROOK, color: COLORS.WHITE };
  board[7][7] = { type: PIECES.ROOK, color: COLORS.WHITE };
  
  // Place knights
  board[0][1] = { type: PIECES.KNIGHT, color: COLORS.BLACK };
  board[0][6] = { type: PIECES.KNIGHT, color: COLORS.BLACK };
  board[7][1] = { type: PIECES.KNIGHT, color: COLORS.WHITE };
  board[7][6] = { type: PIECES.KNIGHT, color: COLORS.WHITE };
  
  // Place bishops
  board[0][2] = { type: PIECES.BISHOP, color: COLORS.BLACK };
  board[0][5] = { type: PIECES.BISHOP, color: COLORS.BLACK };
  board[7][2] = { type: PIECES.BISHOP, color: COLORS.WHITE };
  board[7][5] = { type: PIECES.BISHOP, color: COLORS.WHITE };
  
  // Place queens
  board[0][3] = { type: PIECES.QUEEN, color: COLORS.BLACK };
  board[7][3] = { type: PIECES.QUEEN, color: COLORS.WHITE };
  
  // Place kings
  board[0][4] = { type: PIECES.KING, color: COLORS.BLACK };
  board[7][4] = { type: PIECES.KING, color: COLORS.WHITE };
  
  return board;
};

// Get valid moves for a piece
export const getValidMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];
  
  const moves = [];
  
  switch (piece.type) {
    case PIECES.PAWN:
      moves.push(...getPawnMoves(board, row, col, piece.color));
      break;
    case PIECES.ROOK:
      moves.push(...getRookMoves(board, row, col, piece.color));
      break;
    case PIECES.KNIGHT:
      moves.push(...getKnightMoves(board, row, col, piece.color));
      break;
    case PIECES.BISHOP:
      moves.push(...getBishopMoves(board, row, col, piece.color));
      break;
    case PIECES.QUEEN:
      moves.push(...getQueenMoves(board, row, col, piece.color));
      break;
    case PIECES.KING:
      moves.push(...getKingMoves(board, row, col, piece.color));
      break;
    default:
      break;
  }
  
  return moves;
};

const getPawnMoves = (board, row, col, color) => {
  const moves = [];
  const direction = color === COLORS.WHITE ? -1 : 1;
  const startRow = color === COLORS.WHITE ? 6 : 1;
  
  // Move forward one square
  const newRow = row + direction;
  if (newRow >= 0 && newRow < 8 && !board[newRow][col]) {
    moves.push([newRow, col]);
    
    // Move forward two squares from starting position
    if (row === startRow && !board[row + 2 * direction][col]) {
      moves.push([row + 2 * direction, col]);
    }
  }
  
  // Capture diagonally
  for (const colOffset of [-1, 1]) {
    const newCol = col + colOffset;
    if (newCol >= 0 && newCol < 8 && newRow >= 0 && newRow < 8) {
      const targetPiece = board[newRow][newCol];
      if (targetPiece && targetPiece.color !== color) {
        moves.push([newRow, newCol]);
      }
    }
  }
  
  return moves;
};

const getRookMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  
  for (const [dRow, dCol] of directions) {
    let newRow = row + dRow;
    let newCol = col + dCol;
    
    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetPiece = board[newRow][newCol];
      
      if (!targetPiece) {
        moves.push([newRow, newCol]);
      } else {
        if (targetPiece.color !== color) {
          moves.push([newRow, newCol]);
        }
        break;
      }
      
      newRow += dRow;
      newCol += dCol;
    }
  }
  
  return moves;
};

const getKnightMoves = (board, row, col, color) => {
  const moves = [];
  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];
  
  for (const [dRow, dCol] of knightMoves) {
    const newRow = row + dRow;
    const newCol = col + dCol;
    
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push([newRow, newCol]);
      }
    }
  }
  
  return moves;
};

const getBishopMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  
  for (const [dRow, dCol] of directions) {
    let newRow = row + dRow;
    let newCol = col + dCol;
    
    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetPiece = board[newRow][newCol];
      
      if (!targetPiece) {
        moves.push([newRow, newCol]);
      } else {
        if (targetPiece.color !== color) {
          moves.push([newRow, newCol]);
        }
        break;
      }
      
      newRow += dRow;
      newCol += dCol;
    }
  }
  
  return moves;
};

const getQueenMoves = (board, row, col, color) => {
  return [
    ...getRookMoves(board, row, col, color),
    ...getBishopMoves(board, row, col, color)
  ];
};

const getKingMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  
  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;
    
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push([newRow, newCol]);
      }
    }
  }
  
  return moves;
};

// Find king position
const findKing = (board, color) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === PIECES.KING && piece.color === color) {
        return [row, col];
      }
    }
  }
  return null;
};

// Check if a position is under attack
const isSquareUnderAttack = (board, row, col, byColor) => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === byColor) {
        const moves = getValidMoves(board, r, c);
        if (moves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col)) {
          return true;
        }
      }
    }
  }
  return false;
};

// Check if the current player is in check
export const isInCheck = (board, color) => {
  const kingPos = findKing(board, color);
  if (!kingPos) return false;
  
  const [kingRow, kingCol] = kingPos;
  const opponentColor = color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
  
  return isSquareUnderAttack(board, kingRow, kingCol, opponentColor);
};

// Make a move and return new board
export const makeMove = (board, fromRow, fromCol, toRow, toCol) => {
  const newBoard = board.map(row => [...row]);
  newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
  newBoard[fromRow][fromCol] = null;
  return newBoard;
};

// Check if a move is valid (doesn't leave king in check)
export const isValidMove = (board, fromRow, fromCol, toRow, toCol) => {
  const piece = board[fromRow][fromCol];
  if (!piece) return false;
  
  const validMoves = getValidMoves(board, fromRow, fromCol);
  const moveExists = validMoves.some(([r, c]) => r === toRow && c === toCol);
  
  if (!moveExists) return false;
  
  // Check if move leaves king in check
  const newBoard = makeMove(board, fromRow, fromCol, toRow, toCol);
  return !isInCheck(newBoard, piece.color);
};

// Check if current player has any valid moves
export const hasValidMoves = (board, color) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, row, col);
        for (const [toRow, toCol] of moves) {
          if (isValidMove(board, row, col, toRow, toCol)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

// Check game state
export const getGameState = (board, currentPlayer) => {
  const inCheck = isInCheck(board, currentPlayer);
  const hasMoves = hasValidMoves(board, currentPlayer);
  
  if (!hasMoves) {
    if (inCheck) {
      return 'checkmate';
    } else {
      return 'stalemate';
    }
  }
  
  if (inCheck) {
    return 'check';
  }
  
  return 'playing';
};

// Get piece symbol
export const getPieceSymbol = (piece) => {
  if (!piece) return '';
  
  const symbols = {
    [PIECES.PAWN]: { white: '♙', black: '♟' },
    [PIECES.ROOK]: { white: '♖', black: '♜' },
    [PIECES.KNIGHT]: { white: '♘', black: '♞' },
    [PIECES.BISHOP]: { white: '♗', black: '♝' },
    [PIECES.QUEEN]: { white: '♕', black: '♛' },
    [PIECES.KING]: { white: '♔', black: '♚' }
  };
  
  return symbols[piece.type][piece.color];
};
