import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import '../App.css'; // Reuse App styles if needed, or just inline

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    try {
      const result = game.move(move);
      setGame(new Chess(game.fen()));
      return result;
    } catch (e) {
      return null;
    }
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    return true;
  }
  
  function resetGame() {
      setGame(new Chess());
  }

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 d-flex flex-column align-items-center">
                <h2 className="text-white mb-4">Chess Game</h2>
                <div style={{ width: "100%", maxWidth: "500px" }}>
                    <Chessboard position={game.fen()} onPieceDrop={onDrop} />
                </div>
                <div className="mt-4">
                    <button className="btn btn-light mr-2" onClick={resetGame}>Reset Game</button>
                </div>
                {game.isGameOver() && (
                    <div className="alert alert-light mt-3">
                        Game Over! {game.isCheckmate() ? "Checkmate!" : "Draw"}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
