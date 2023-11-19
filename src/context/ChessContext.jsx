import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useReducer
} from "react"
import { isPawnMoveLegal } from "../hooks/useChessLogic"
import {
  SET_BOARD,
  START_GAME,
  CHANGE_PLAYER,
  RESET_GAME,
  MOVE_PIECE,
  chessReducer,
  initialState
} from "../reducers/chessReducer"

const ChessContext = createContext()
const ChessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chessReducer, initialState)
  const [selectedPiece, setSelectedPiece] = useState(null)
  const setBoard = useCallback((newBoard) => {
    dispatch({ type: SET_BOARD, payload: newBoard })
  }, [])
  const startGame = useCallback(() => {
    dispatch({ type: START_GAME })
  }, [])
  const resetGame = useCallback(() => {
    console.log("resetGame appelé")
    dispatch({ type: RESET_GAME })
  }, [])
  const canMove = useCallback(
    (piece) =>
      (piece.color === "white" && state.currentPlayer === 1) ||
      (piece.color === "black" && state.currentPlayer === 2),
    [state.currentPlayer]
  )
  const movePiece = useCallback(
    (pieceToMove, toPosition) => {
      if (pieceToMove.type.toLowerCase() === "pawn") {
        const moveIsLegal = isPawnMoveLegal({
          fromPosition: pieceToMove.position,
          toPosition,
          board: state.board
        })

        if (moveIsLegal && canMove(pieceToMove)) {
          dispatch({ type: CHANGE_PLAYER })
          dispatch({
            type: MOVE_PIECE,
            payload: {
              fromPosition: pieceToMove.position,
              toPosition,
              piece: { ...pieceToMove, position: toPosition }
            }
          })
          console.log("test")
        }
      }
    },
    [state.board, canMove, dispatch]
  )
  const handlePieceSelection = useCallback(
    (piece) => {
      console.log("handlePieceSelection appelé avec", piece)

      if (piece && canMove(piece)) {
        setSelectedPiece(piece)
        console.log("Après setSelectedPiece:", piece)
      }
    },
    [canMove, selectedPiece]
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
