import { useState } from 'react'
import './App.css'

const TURN = {
  X: 'X',
  O: 'O'
}


const Square = ({children, isSelected, updateBoard, index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}


function App() {

  const [board, setBoard]= useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURN.X)

  const updateBoard = (index) => {
    if (board[index]) return
    
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>Tic tac Toe</h1>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
            {board[index]}
            </Square>
          )
        })}
      </section>
      
      <div className="turn">
        <Square isSelected={turn === TURN.X}>
          {TURN.X}
        </Square>
        <Square isSelected={turn === TURN.O}>
          {TURN.O}
        </Square>
      </div>

    </main>
  )
}

export default App
