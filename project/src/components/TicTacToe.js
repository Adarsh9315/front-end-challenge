import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [winner, setWinner] = useState(null);
	const [winningLine, setWinningLine] = useState([]);

	const calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return { winner: squares[a], line: lines[i] };
			}
		}
		return null;
	};

	const handleClick = (index) => {
		if (board[index] || winner) {
			return;
		}

		const newBoard = [...board];
		newBoard[index] = isXNext ? 'X' : 'O';
		setBoard(newBoard);
		setIsXNext(!isXNext);

		const result = calculateWinner(newBoard);
		if (result) {
			setWinner(result.winner);
			setWinningLine(result.line);
		}
	};

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setIsXNext(true);
		setWinner(null);
		setWinningLine([]);
	};

	const renderSquare = (index) => {
		const isWinningSquare = winningLine.includes(index);
		return (
			<button
				className={`square ${isWinningSquare ? 'winning' : ''}`}
				onClick={() => handleClick(index)}
			>
				{board[index]}
			</button>
		);
	};

	const isBoardFull = board.every(square => square !== null);
	const status = winner
		? `Winner: ${winner}`
		: isBoardFull
		? "It's a Draw!"
		: `Next Player: ${isXNext ? 'X' : 'O'}`;

	return (
		<div className="tictactoe-container">
			<h1 className="game-title">Tic Tac Toe</h1>
			<div className="status">{status}</div>
			<div className="board">
				<div className="board-row">
					{renderSquare(0)}
					{renderSquare(1)}
					{renderSquare(2)}
				</div>
				<div className="board-row">
					{renderSquare(3)}
					{renderSquare(4)}
					{renderSquare(5)}
				</div>
				<div className="board-row">
					{renderSquare(6)}
					{renderSquare(7)}
					{renderSquare(8)}
				</div>
			</div>
			<button className="reset-button" onClick={resetGame}>
				New Game
			</button>
		</div>
	);
};

export default TicTacToe;
