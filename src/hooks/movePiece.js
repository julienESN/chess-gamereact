import { convertToAlgebraicNotation } from "../utils/convertToAlgebraicNotation"
import { MOVE_PIECE, CHANGE_PLAYER } from "../reducers/chessReducer"

export const movePieceFunction =
  ({ dispatch, state, isMoveLegal, canMove }) =>
  (pieceToMove, toPosition) => {
    if (isMoveLegal(pieceToMove, toPosition) && canMove(pieceToMove)) {
      const targetPiece = state.board[toPosition.x][toPosition.y]

      if (targetPiece && targetPiece.color !== pieceToMove.color) {
        dispatch({
          type: "CAPTURE_PIECE",
          payload: {
            player: state.currentPlayer,
            capturedPiece: targetPiece
          }
        })
      }

      const moveNotation = convertToAlgebraicNotation(
        pieceToMove.position,
        toPosition
      )
      dispatch({ type: CHANGE_PLAYER })
      dispatch({
        type: MOVE_PIECE,
        payload: {
          fromPosition: pieceToMove.position,
          toPosition,
          piece: { ...pieceToMove, position: toPosition },
          notation: moveNotation
        }
      })
    }
  }
