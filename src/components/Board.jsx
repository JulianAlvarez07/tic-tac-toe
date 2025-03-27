import { useState } from "react";
import { Square } from "./Square";
import { WinnerModal } from "./WinnerModal";
import { TURN, WINNER_COMBOS } from "../constants";
import { checkWinner, checkEndGame } from "../gameLogic";

const Board = () => {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURN.X
  })

  const [winner, setWinner] = useState(null);


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);
    //guardar partida aqui
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn',newTurn);
    
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear Juego</button>
      <section className="game">
        {board.map((square, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
};

export default Board;
