import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    const gameCopy = new Chess(game.fen());
    try {
        const result = gameCopy.move(move);
        setGame(gameCopy);
        return result; // null if the move was illegal, the move object if the move was legal
    } catch (e) {
        return null;
    }
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for simplicity
    });

    if (move === null) return false;
    
    // Simple random computer move after a short delay
    setTimeout(makeRandomMove, 200);
    return true;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return; // exit if the game is over
    
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Chess Game</h2>
      <div className="d-flex justify-content-center">
        <div style={{ width: '400px', height: '400px' }}>
          <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
      </div>
      <div className="text-center mt-3">
        {game.isGameOver() && 
          <div className="alert alert-info">
             Game Over! {game.isCheckmate() ? "Checkmate!" : "Draw"}
             <button className="btn btn-primary ml-2" onClick={() => setGame(new Chess())}>Restart</button>
          </div>
        }
      </div>
    </div>
  );
};

export default ChessGame;
