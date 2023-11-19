import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useCallback
} from "react"
import { chessReducer, initialState } from "../reducers/chessReducer"
import { useGameControls } from "../hooks/useGameControls"

const ChessContext = createContext()
const ChessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chessReducer, initialState)
  const [selectedPiece, setSelectedPiece] = useState(null)
  const { setBoard, startGame, resetGame, movePiece, canMove } =
    useGameControls(state, dispatch)
  const handlePieceSelection = useCallback(
    (piece) => {
      if (piece && canMove(piece)) {
        setSelectedPiece(piece)
      }
    },
    [canMove]
  )
  const handleSquareClick = useCallback(
    (toPosition, piece) => {
      if (state.gameStatus !== "playing") {
        return
      }

      if (!selectedPiece) {
        handlePieceSelection(piece)
      } else {
        movePiece(selectedPiece, toPosition)
        setSelectedPiece(null)
      }
    },
    [state.gameStatus, selectedPiece, movePiece, handlePieceSelection]
  )

  return (
    <ChessContext.Provider
      value={{ ...state, setBoard, resetGame, startGame, handleSquareClick }}>
      {children}
    </ChessContext.Provider>
  )
}
const useChess = () => useContext(ChessContext)

export { ChessProvider, useChess }
