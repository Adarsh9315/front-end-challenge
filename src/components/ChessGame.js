import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Link } from 'react-router-dom';

const ChessGame = () => {
  const [game] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [, setFen] = useState(game.fen());

  const onSquareClick = (row, col) => {
    const file = String.fromCharCode(97 + col); // 0 -> a
    const rank = 8 - row; // 0 -> 8
    const square = `${file}${rank}`;

    if (selectedSquare === null) {
      // Select source square
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
      }
    } else {
      // Try move
      try {
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: 'q' // always promote to queen for simplicity
        });

        if (move) {
            setFen(game.fen());
            setBoard(game.board());
            setSelectedSquare(null);
        } else {
             // Invalid move, but maybe selecting a different piece?
             const piece = game.get(square);
             if (piece && piece.color === game.turn()) {
                 setSelectedSquare(square);
             } else {
                 setSelectedSquare(null);
             }
        }
      } catch (e) {
          // If move throws (invalid), reset or select new piece
          const piece = game.get(square);
          if (piece && piece.color === game.turn()) {
             setSelectedSquare(square);
          } else {
             setSelectedSquare(null);
          }
      }
    }
  };

  const getPieceSymbol = (piece) => {
      if (!piece) return '';
      const type = piece.type;
      const isWhite = piece.color === 'w';
      
      if (isWhite) {
          switch(type) {
              case 'k': return '♔';
              case 'q': return '♕';
              case 'r': return '♖';
              case 'b': return '♗';
              case 'n': return '♘';
              case 'p': return '♙';
              default: return '';
          }
      } else {
          switch(type) {
              case 'k': return '♚';
              case 'q': return '♛';
              case 'r': return '♜';
              case 'b': return '♝';
              case 'n': return '♞';
              case 'p': return '♟';
              default: return '';
          }
      }
  };

  const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      color: 'white'
  };

  const boardStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 50px)',
      gridTemplateRows: 'repeat(8, 50px)',
      border: '5px solid #333'
  };

  const getSquareStyle = (row, col, isSelected) => {
      const isBlack = (row + col) % 2 === 1;
      const backgroundColor = isSelected ? 'yellow' : (isBlack ? '#769656' : '#eeeed2');
      return {
          width: '50px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '35px',
          cursor: 'pointer',
          backgroundColor: backgroundColor,
          color: 'black'
      };
  };

  return (
    <div style={containerStyle}>
      <h1>Chess Game</h1>
      <div style={{ marginBottom: '10px' }}>
         <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
      <div style={{ marginBottom: '10px' }}>
        Turn: {game.turn() === 'w' ? 'White' : 'Black'}
        {game.isCheckmate() && <span> - Checkmate! Winner: {game.turn() === 'w' ? 'Black' : 'White'}</span>}
        {game.isDraw() && <span> - Draw!</span>}
        {game.isCheck() && !game.isCheckmate() && <span> - Check!</span>}
      </div>
      <div style={boardStyle}>
        {board.map((row, rowIndex) => 
          row.map((piece, colIndex) => {
              const file = String.fromCharCode(97 + colIndex);
              const rank = 8 - rowIndex;
              const square = `${file}${rank}`;
              const isSelected = selectedSquare === square;
              
              return (
                <div 
                    key={`${rowIndex}-${colIndex}`}
                    style={getSquareStyle(rowIndex, colIndex, isSelected)}
                    onClick={() => onSquareClick(rowIndex, colIndex)}
                >
                    {getPieceSymbol(piece)}
                </div>
              );
          })
        )}
      </div>
    </div>
  );
};

export default ChessGame;