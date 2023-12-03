import { isPathClear } from "../utils/chessUtils"

const BISHOP_DIRECTIONS = [
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 1 }
]

export const isBishopMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  const moveDirection = {
    x: Math.sign(toPosition.x - fromPosition.x),
    y: Math.sign(toPosition.y - fromPosition.y)
  }
  const isDiagonalMove = BISHOP_DIRECTIONS.some(
    (direction) =>
      direction.x === moveDirection.x && direction.y === moveDirection.y
  )

  if (!isDiagonalMove) {
    return false
  }

  if (!isPathClear({ fromPosition, toPosition, board, delta: moveDirection })) {
    return false
  }

  const targetPiece = board[toPosition.x][toPosition.y]

  return !(targetPiece && targetPiece.color === piece.color)
}
