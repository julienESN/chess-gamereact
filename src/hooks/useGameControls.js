import { useCallback } from "react"
import {
  SET_BOARD,
  START_GAME,
  CHANGE_PLAYER,
  RESET_GAME,
  MOVE_PIECE
} from "../reducers/chessReducer"
import { isPawnMoveLegal } from "../hooks/useChessLogic"

export const useGameControls = (state, dispatch) => {
  const setBoard = useCallback(
    (newBoard) => {
      dispatch({ type: SET_BOARD, payload: newBoard })
    },
    [dispatch]
  )
  const startGame = useCallback(() => {
    dispatch({ type: START_GAME })
  }, [dispatch])
  const resetGame = useCallback(() => {
    dispatch({ type: RESET_GAME })
  }, [dispatch])
  const canMove = useCallback(
    (piece) =>
      (piece.color === "white" && state.currentPlayer === 1) ||
      (piece.color === "black" && state.currentPlayer === 2),
    [state.currentPlayer]
  )
  const movePiece = useCallback(
    (pieceToMove, toPosition) => {
      if (
        pieceToMove.type.toLowerCase() === "pawn" &&
        isPawnMoveLegal({
          fromPosition: pieceToMove.position,
          toPosition,
          board: state.board
        }) &&
        canMove(pieceToMove)
      ) {
        dispatch({ type: CHANGE_PLAYER })
        dispatch({
          type: MOVE_PIECE,
          payload: {
            fromPosition: pieceToMove.position,
            toPosition,
            piece: { ...pieceToMove, position: toPosition }
          }
        })
      }
    },
    [state.board, state.currentPlayer, dispatch]
  )

  return { setBoard, startGame, resetGame, movePiece, canMove }
}
