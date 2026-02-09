import React, { useState, useEffect } from 'react';
import './ChessGame.css';

const ChessGame = () => {
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [validMoves, setValidMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });

  // Initialize the chess board
  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Set up pawns
    for (let i = 0; i < 8; i++) {
      newBoard[1][i] = { type: 'pawn', color: 'black' };
      newBoard[6][i] = { type: 'pawn', color: 'white' };
    }
    
    // Set up other pieces
    const pieceOrder = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let i = 0; i < 8; i++) {
      newBoard[0][i] = { type: pieceOrder[i], color: 'black' };
      newBoard[7][i] = { type: pieceOrder[i], color: 'white' };
    }
    
    setBoard(newBoard);
    setGameStatus('White to move');
  };

  const getPieceSymbol = (piece) => {
    if (!piece) return '';
    
    const symbols = {
      white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
      },
      black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
      }
    };
    
    return symbols[piece.color][piece.type];
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol, piece) => {
    // Check if destination is out of bounds
    if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;
    
    // Check if destination has same color piece
    const targetPiece = board[toRow][toCol];
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Move forward
        if (colDiff === 0 && rowDiff === direction && !targetPiece) return true;
        
        // First move can be 2 squares
        if (colDiff === 0 && fromRow === startRow && rowDiff === 2 * direction && 
            !targetPiece && !board[fromRow + direction][fromCol]) return true;
        
        // Capture diagonally
        if (Math.abs(colDiff) === 1 && rowDiff === direction && targetPiece) return true;
        
        return false;
        
      case 'rook':
        if (rowDiff === 0 || colDiff === 0) {
          return isPathClear(fromRow, fromCol, toRow, toCol);
        }
        return false;
        
      case 'knight':
        return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
               (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
        
      case 'bishop':
        if (Math.abs(rowDiff) === Math.abs(colDiff)) {
          return isPathClear(fromRow, fromCol, toRow, toCol);
        }
        return false;
        
      case 'queen':
        if (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) {
          return isPathClear(fromRow, fromCol, toRow, toCol);
        }
        return false;
        
      case 'king':
        return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
        
      default:
        return false;
    }
  };

  const isPathClear = (fromRow, fromCol, toRow, toCol) => {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
    
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
    
    while (currentRow !== toRow || currentCol !== toCol) {
      if (board[currentRow][currentCol]) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return true;
  };

  const getValidMovesForPiece = (row, col) => {
    const moves = [];
    const piece = board[row][col];
    
    if (!piece) return moves;
    
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (isValidMove(row, col, r, c, piece)) {
          moves.push([r, c]);
        }
      }
    }
    
    return moves;
  };

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const selectedPiece = board[selectedRow][selectedCol];
      
      // Check if clicked square is a valid move
      const isValid = validMoves.some(([r, c]) => r === row && c === col);
      
      if (isValid) {
        // Make the move
        const newBoard = board.map(row => [...row]);
        const capturedPiece = newBoard[row][col];
        
        // Capture piece if exists
        if (capturedPiece) {
          const newCaptured = { ...capturedPieces };
          newCaptured[selectedPiece.color].push(capturedPiece);
          setCapturedPieces(newCaptured);
        }
        
        newBoard[row][col] = selectedPiece;
        newBoard[selectedRow][selectedCol] = null;
        
        setBoard(newBoard);
        setSelectedSquare(null);
        setValidMoves([]);
        
        // Switch player
        const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
        setCurrentPlayer(nextPlayer);
        setGameStatus(`${nextPlayer.charAt(0).toUpperCase() + nextPlayer.slice(1)} to move`);
      } else if (piece && piece.color === currentPlayer) {
        // Select new piece
        setSelectedSquare([row, col]);
        setValidMoves(getValidMovesForPiece(row, col));
      } else {
        // Deselect
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else if (piece && piece.color === currentPlayer) {
      // Select piece
      setSelectedSquare([row, col]);
      setValidMoves(getValidMovesForPiece(row, col));
    }
  };

  const isSquareSelected = (row, col) => {
    return selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
  };

  const isValidMoveSquare = (row, col) => {
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  const resetGame = () => {
    initializeBoard();
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setValidMoves([]);
    setCapturedPieces({ white: [], black: [] });
    setGameStatus('White to move');
  };

  return (
    <div className="chess-game-container">
      <h1 className="chess-title">Chess Game</h1>
      
      <div className="game-info">
        <div className="status-bar">
          <span className="current-player">{gameStatus}</span>
          <button className="reset-button" onClick={resetGame}>New Game</button>
        </div>
        
        <div className="captured-pieces-container">
          <div className="captured-section">
            <h3>Captured by White:</h3>
            <div className="captured-pieces">
              {capturedPieces.white.map((piece, idx) => (
                <span key={idx} className="captured-piece">{getPieceSymbol(piece)}</span>
              ))}
            </div>
          </div>
          <div className="captured-section">
            <h3>Captured by Black:</h3>
            <div className="captured-pieces">
              {capturedPieces.black.map((piece, idx) => (
                <span key={idx} className="captured-piece">{getPieceSymbol(piece)}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="chessboard">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((piece, colIndex) => {
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const isSelected = isSquareSelected(rowIndex, colIndex);
              const isValidMove = isValidMoveSquare(rowIndex, colIndex);
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                >
                  <span className="piece">{getPieceSymbol(piece)}</span>
                  {isValidMove && <div className="move-indicator"></div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="game-instructions">
        <h3>How to Play:</h3>
        <ul>
          <li>Click on a piece to select it (highlighted in yellow)</li>
          <li>Valid moves will be shown with green dots</li>
          <li>Click on a valid move to move the piece</li>
          <li>Players alternate turns (White starts first)</li>
          <li>Capture opponent pieces by moving to their square</li>
        </ul>
      </div>
    </div>
  );
};

export default ChessGame;
