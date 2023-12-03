const KING_MOVES = [
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 }
]

export const isKingMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  const moveDelta = {
    x: toPosition.x - fromPosition.x,
    y: toPosition.y - fromPosition.y
  }
  const isMoveAllowed = KING_MOVES.some(
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
