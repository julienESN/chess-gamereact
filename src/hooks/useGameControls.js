import { useCallback } from "react"
import { SET_BOARD, START_GAME, RESET_GAME } from "../reducers/chessReducer"
import { isPawnMoveLegal } from "./movePawn"
import { isBishopMoveLegal } from "./moveBishop"
import { isKingMoveLegal } from "./moveKing"
import { isRookMoveLegal } from "./moveRook"
import { isKnightMoveLegal } from "./moveKnight"
import { isQueenMoveLegal } from "./moveQueen"
import { movePieceFunction } from "./movePiece"
import { isMoveLegal as isMoveLegalFunction } from "./isMoveLegal"
const moveLegalityFunctions = {
  pawn: isPawnMoveLegal,
  king: isKingMoveLegal,
  bishop: isBishopMoveLegal,
  rook: isRookMoveLegal,
  knight: isKnightMoveLegal,
  queen: isQueenMoveLegal
}

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
  const isMoveLegal = useCallback(
    isMoveLegalFunction(moveLegalityFunctions, state),
    [state, moveLegalityFunctions]
  )
  const movePiece = useCallback(
    movePieceFunction({ dispatch, state, isMoveLegal, canMove }),
    [dispatch, state, isMoveLegal, canMove]
  )

  return { setBoard, startGame, resetGame, movePiece, canMove }
}
