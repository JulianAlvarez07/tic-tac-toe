import { useState } from 'react'
import './App.css'
import {Square} from './components/Square'
import {WinnerModal} from './components/WinnerModal'
import {TURN, WINNER_COMBOS, checkEndGame} from './constant'


function App() {
  const [board, setBoard]= useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURN.X)
  //null es que no hay ganador y false empate
  const [winner, setWinner] = useState(null) 

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] && 
          boardToCheck[a] === boardToCheck[b] && 
          boardToCheck[a] === boardToCheck[c]
        ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    //si la casilla ya esta ocupada
    if (board[index] || winner) return
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard) //ASINCRONO
    //cambiar el turno
    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate 
  }
}

  return (
    <main className='board'>
      <h1>Tic tac Toe</h1>
      <button onClick={resetGame}>Resetear Juego</button>
      <section className='game'>
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
            {square}
            </Square>
          )
        })}
      </section>
      
      <section className="turn">
        <Square isSelected={turn === TURN.X}>
          {TURN.X}
        </Square>
        <Square isSelected={turn === TURN.O}>
          {TURN.O}
        </Square>
      </section>
        
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
