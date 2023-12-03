const KNIGHT_MOVES = [
  { x: 2, y: 1 },
  { x: 2, y: -1 },
  { x: -2, y: 1 },
  { x: -2, y: -1 },
  { x: 1, y: 2 },
  { x: 1, y: -2 },
  { x: -1, y: 2 },
  { x: -1, y: -2 }
]

export const isKnightMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  const moveDelta = {
    x: toPosition.x - fromPosition.x,
    y: toPosition.y - fromPosition.y
  }
  const isMoveAllowed = KNIGHT_MOVES.some(
    (move) => move.x === moveDelta.x && move.y === moveDelta.y
  )

  if (!isMoveAllowed) {
    return false
  }

  const targetPiece = board[toPosition.x][toPosition.y]

  if (targetPiece && targetPiece.color === piece.color) {
    return false
  }

  return true
}
