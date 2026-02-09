import React, { useState } from 'react';
import { 
  initializeBoard, 
  getValidMoves, 
  isValidMove, 
  makeMove, 
  getGameState,
  getPieceSymbol,
  COLORS
} from '../utils/chessLogic';
import './ChessGame.css';

const ChessGame = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(COLORS.WHITE);
  const [gameState, setGameState] = useState('playing');
  const [moveHistory, setMoveHistory] = useState([]);

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];

    // If a square is already selected
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      
      // Check if the clicked square is a valid move
      if (isValidMove(board, selectedRow, selectedCol, row, col)) {
        // Make the move
        const newBoard = makeMove(board, selectedRow, selectedCol, row, col);
        setBoard(newBoard);
        
        // Add to move history
        const fromSquare = String.fromCharCode(97 + selectedCol) + (8 - selectedRow);
        const toSquare = String.fromCharCode(97 + col) + (8 - row);
        setMoveHistory([...moveHistory, `${currentPlayer}: ${fromSquare} → ${toSquare}`]);
        
        // Switch player
        const nextPlayer = currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
        setCurrentPlayer(nextPlayer);
        
        // Check game state
        const newGameState = getGameState(newBoard, nextPlayer);
        setGameState(newGameState);
        
        // Clear selection
        setSelectedSquare(null);
        setValidMoves([]);
      } else {
        // If clicking on own piece, select it instead
        if (piece && piece.color === currentPlayer) {
          setSelectedSquare([row, col]);
          setValidMoves(getValidMoves(board, row, col).filter(
            ([toRow, toCol]) => isValidMove(board, row, col, toRow, toCol)
          ));
        } else {
          // Clear selection
          setSelectedSquare(null);
          setValidMoves([]);
        }
      }
    } else {
      // Select a piece if it belongs to current player
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(board, row, col).filter(
          ([toRow, toCol]) => isValidMove(board, row, col, toRow, toCol)
        ));
      }
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setSelectedSquare(null);
    setValidMoves([]);
    setCurrentPlayer(COLORS.WHITE);
    setGameState('playing');
    setMoveHistory([]);
  };

  const isValidMoveSquare = (row, col) => {
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  const isSelected = (row, col) => {
    return selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
  };

  return (
    <div className="chess-game">
      <div className="chess-header">
        <h1>Chess Game</h1>
        <button className="btn btn-primary reset-btn" onClick={resetGame}>
          New Game
        </button>
      </div>

      <div className="chess-container">
        <div className="chess-board-wrapper">
          <div className="game-status">
            <div className={`player-turn ${currentPlayer}`}>
              Current Player: <strong>{currentPlayer.toUpperCase()}</strong>
            </div>
            {gameState === 'check' && (
              <div className="status-message check">
                Check! {currentPlayer.toUpperCase()} is in check!
              </div>
            )}
            {gameState === 'checkmate' && (
              <div className="status-message checkmate">
                Checkmate! {currentPlayer === COLORS.WHITE ? 'BLACK' : 'WHITE'} wins!
              </div>
            )}
            {gameState === 'stalemate' && (
              <div className="status-message stalemate">
                Stalemate! The game is a draw.
              </div>
            )}
          </div>

          <div className="chess-board">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="chess-row">
                {row.map((piece, colIndex) => {
                  const isDark = (rowIndex + colIndex) % 2 === 1;
                  const isSelectedSquare = isSelected(rowIndex, colIndex);
                  const isValidMove = isValidMoveSquare(rowIndex, colIndex);
                  
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`chess-square ${isDark ? 'dark' : 'light'} 
                        ${isSelectedSquare ? 'selected' : ''} 
                        ${isValidMove ? 'valid-move' : ''}`}
                      onClick={() => handleSquareClick(rowIndex, colIndex)}
                    >
                      {colIndex === 0 && (
                        <div className="row-label">{8 - rowIndex}</div>
                      )}
                      {rowIndex === 7 && (
                        <div className="col-label">{String.fromCharCode(97 + colIndex)}</div>
                      )}
                      {piece && (
                        <div className={`chess-piece ${piece.color}`}>
                          {getPieceSymbol(piece)}
                        </div>
                      )}
                      {isValidMove && !piece && (
                        <div className="move-indicator"></div>
                      )}
                      {isValidMove && piece && (
                        <div className="capture-indicator"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="chess-sidebar">
          <h3>Move History</h3>
          <div className="move-history">
            {moveHistory.length === 0 ? (
              <p className="no-moves">No moves yet</p>
            ) : (
              moveHistory.map((move, index) => (
                <div key={index} className="move-item">
                  {index + 1}. {move}
                </div>
              ))
            )}
          </div>

          <div className="game-info">
            <h3>How to Play</h3>
            <ul>
              <li>Click a piece to select it</li>
              <li>Click a highlighted square to move</li>
              <li>Green dots show valid moves</li>
              <li>Red outline shows captures</li>
              <li>Game prevents illegal moves</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
