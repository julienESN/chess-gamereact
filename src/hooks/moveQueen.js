import { calculateDirection, isPathClear } from "../utils/chessUtils"

const QUEEN_DIRECTIONS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 1 }
]

export const isQueenMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  const moveDirection = {
    x: calculateDirection(fromPosition.x, toPosition.x),
    y: calculateDirection(fromPosition.y, toPosition.y)
  }
  const isMoveAllowed = QUEEN_DIRECTIONS.some(
    (direction) =>
      direction.x === moveDirection.x && direction.y === moveDirection.y
  )

  if (!isMoveAllowed) {
    return false
  }

  if (!isPathClear({ fromPosition, toPosition, board, delta: moveDirection })) {
    return false
  }

  const targetPiece = board[toPosition.x][toPosition.y]

  return !(targetPiece && targetPiece.color === piece.color)
}
