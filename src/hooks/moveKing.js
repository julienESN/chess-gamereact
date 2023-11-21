export const isKingMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  if (
    Math.abs(fromPosition.x - toPosition.x) > 1 ||
    Math.abs(fromPosition.y - toPosition.y) > 1
  ) {
    return false
  }

  const targetPiece = board[toPosition.x][toPosition.y]

  if (targetPiece && targetPiece.color === piece.color) {
    return false
  }

  return true
}
