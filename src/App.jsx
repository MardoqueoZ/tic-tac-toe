import {useState} from "react"

// establece los turnos
const TURNS = {
  X: "x",
  O: "o",
}

// dibuja los cuadrados del tablero
const Square = ({children, isSelected, updateBoard, index}) => {
  // muestra de quien es el turno
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

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  // el estado de los cuadros, un useState devuelve el valor del estado (board) y la función para actualizarlo (setBoard)
  const [board, setBoard] = useState(Array(9).fill(null))
  
  // estado de los turnos, inicia con X
  const [turn, setTurn] = useState(TURNS.X)
  // null significa que no hay ganador y false es un empate
  const [winner, setWinner] = useState(null)
  
  const checkWinner = (boardCheck) => {
    // revisamos todas las combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardCheck[a] && // revisa si en el index 0 hay x y o
        boardCheck[a] === boardCheck[b] && // revisa si a es igual a b
        boardCheck[a] === boardCheck[c] // revisa si a es igual a c
      ) {
        return boardCheck[a] // devuelve la x u o que esta en la posicion 0 ya que es el ganador
      }
    }
    // si no hay ganador
    return null
  }
  
  // devuelve todo a como estaba al inicio
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  // ver si hubo empate
  const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square !== null)
  }
  
  
  // actualiza el tablero de acuerdo al turno
  const updateBoard = (index) => {
    // si la posición ya está ocupada o hay un ganador no se actualiza.
    if (board[index] || winner) return
    // se crea un nuevo tablero (el tablero viejo actualizado)
    const newBoard = [...board]
    // el tablero recibe el indice del cuadro donde el usuario hace click, entonces el newBoard con el indice va a ser igual al turno actual, eso es lo que se muestra dentro del cuadro
    newBoard[index] = turn
    // actualizamos el estado del tablero
    setBoard(newBoard)
    
    // muestra de quien es el turno (de X o de O)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    // actualiza el turno
    setTurn(newTurn)
    
    // revisa si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }
  return (
    <main className='board'>
      <h1>Tic-Tac-Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square> 
      </section>
      
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Ganó: '
                }
              </h2>
              
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
              
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
