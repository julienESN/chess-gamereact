import React, { createContext, useContext, useReducer, useMemo } from "react"
import { chessReducer, getInitialState } from "../reducers/chessReducer"
import { useGameControls } from "../hooks/useGameControls"
import { usePieceSelection } from "../hooks/usePieceSelection"

export const ChessContext = createContext()
const ChessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chessReducer, getInitialState())
  const { setBoard, startGame, resetGame, movePiece, canMove } =
    useGameControls(state, dispatch)
  const { selectedPiece, handlePieceSelection, setSelectedPiece } =
    usePieceSelection(canMove)
  const handleSquareClick = (toPosition, piece) => {
    if (state.gameStatus !== "playing") {
      return
    }

    if (!selectedPiece) {
      handlePieceSelection(piece)
    } else {
      movePiece(selectedPiece, toPosition)
      setSelectedPiece(null)
    }
  }
  const contextValue = useMemo(
    () => ({
      ...state,
      setBoard,
      resetGame,
      startGame,
      handleSquareClick
    }),
    [state, setBoard, resetGame, startGame, handleSquareClick]
  )

  return (
    <ChessContext.Provider value={contextValue}>
      {children}
    </ChessContext.Provider>
  )
}
const useChessContext = () => useContext(ChessContext)

export { ChessProvider, useChessContext }
