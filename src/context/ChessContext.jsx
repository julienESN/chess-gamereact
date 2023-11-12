import React, { createContext, useContext, useState } from "react"

const ChessContext = createContext()
const ChessProvider = ({ children }) => {
  const [board, setBoard] = useState(createInitialBoard())
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [capturedPieces, setCapturedPieces] = useState([])
  const resetBoard = () => {
    setBoard(createInitialBoard())
    setCurrentPlayer(1)
    setCapturedPieces([])
  }

  return (
    <ChessContext.Provider
      value={{
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        capturedPieces,
        setCapturedPieces,
        resetBoard
      }}>
      {children}
    </ChessContext.Provider>
  )
}
const useChess = () => {
  const context = useContext(ChessContext)

  return context
}

function createInitialBoard() {
  const initialPieces = {
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king",
    p: "pawn",
    R: "Rook",
    N: "Knight",
    B: "Bishop",
    Q: "Queen",
    K: "King",
    P: "Pawn"
  }
  const setup = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
  ]

  return setup.map((row) =>
    row.map((piece) =>
      piece
        ? {
            type: initialPieces[piece],
            color: piece === piece.toUpperCase() ? "white" : "black"
          }
        : null
    )
  )
}

export { ChessProvider, useChess }
