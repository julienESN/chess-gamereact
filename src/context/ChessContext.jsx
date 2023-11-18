import React, { createContext, useContext, useState, useCallback } from "react"
import { isPawnMoveLegal } from "../hooks/useChessLogic"
const initialState = {
  board: createInitialBoard(),
  currentPlayer: 1,
  capturedPieces: { player1: [], player2: [] },
  playerTimes: { player1: 0, player2: 0 },
  gameStatus: "waiting",
  moveHistory: []
}
const ChessContext = createContext()
const ChessProvider = ({ children }) => {
  const [state, setState] = useState(initialState)
  const [selectedPiece, setSelectedPiece] = useState(null)
  const setBoard = newBoard => {
    setState(prevState => ({ ...prevState, board: newBoard }))
  }
  const startGame = useCallback(() => {
    setState(prevState => ({ ...prevState, gameStatus: "playing" }))
  }, [])
  const resetGame = useCallback(() => {
    setState(initialState)
  }, [initialState])
  const handleSquareClick = useCallback((toPosition, piece) => {
    console.log("handleSquareClick appelé", { toPosition, piece, gameState: state.gameStatus })

    if (state.gameStatus !== "playing") {
      console.log("Le jeu n'est pas en cours.")


      return
    }

    // Si aucune pièce n'est sélectionnée, sélectionnez la pièce cliquée
    if (!selectedPiece && piece) {
      console.log("Pièce sélectionnée pour le mouvement:", piece)
      setSelectedPiece(piece)


      return
    }

    // Si une pièce est sélectionnée, vérifiez si le mouvement est légal
    if (selectedPiece) {
      console.log("Tentative de mouvement", { fromPosition: selectedPiece.position, toPosition, currentPlayer: state.currentPlayer })

      if (selectedPiece.type.toLowerCase() === "pawn") {
        const moveIsLegal = isPawnMoveLegal({ fromPosition: selectedPiece.position, toPosition, board: state.board })
        console.log("Résultat de isPawnMoveLegal", moveIsLegal)

        if (moveIsLegal) {
          const newBoard = [...state.board]
          newBoard[selectedPiece.position.x][selectedPiece.position.y] = null
          newBoard[toPosition.x][toPosition.y] = { ...selectedPiece, position: toPosition }

          setState(prevState => ({
            ...prevState,
            board: newBoard,
            currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
          }))
        } else {
          console.log("Mouvement illégal.")
        }
      }

      // Réinitialiser la pièce sélectionnée après le mouvement
      setSelectedPiece(null)
    }
  }, [state, setState, selectedPiece])



  return (
    <ChessContext.Provider
      value={{
        ...state,
        setBoard,
        resetGame,
        startGame,
        handleSquareClick
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
    r: "rook", n: "knight", b: "bishop", q: "queen", k: "king", p: "pawn",
    R: "Rook", N: "Knight", B: "Bishop", Q: "Queen", K: "King", P: "Pawn"
  }
  const createRow = (pieces, rowIndex) => pieces.map((piece, colIndex) => ({
    type: initialPieces[piece],
    color: piece === piece.toUpperCase() ? "white" : "black",
    position: { x: rowIndex, y: colIndex }
  }))

  return [
    createRow(["r", "n", "b", "q", "k", "b", "n", "r"], 0),
    createRow(["p", "p", "p", "p", "p", "p", "p", "p"], 1),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    createRow(["P", "P", "P", "P", "P", "P", "P", "P"], 6),
    createRow(["R", "N", "B", "Q", "K", "B", "N", "R"], 7)
  ]
}


export { ChessProvider, useChess }
