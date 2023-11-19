function isForwardMove({ fromPosition, toPosition, targetPiece, direction }) {
  return (
    fromPosition.y === toPosition.y &&
    fromPosition.x + direction === toPosition.x &&
    !targetPiece
  )
}

function isInitialMove({
  fromPosition,
  toPosition,
  board,
  direction,
  startRow
}) {
  return (
    fromPosition.x === startRow &&
    fromPosition.x + 2 * direction === toPosition.x &&
    !board[toPosition.x][toPosition.y] &&
    !board[fromPosition.x + direction][fromPosition.y]
  )
}

function isDiagonalCapture({
  fromPosition,
  toPosition,
  piece,
  targetPiece,
  direction
}) {
  return (
    Math.abs(fromPosition.y - toPosition.y) === 1 &&
    fromPosition.x + direction === toPosition.x &&
    targetPiece &&
    targetPiece.color !== piece.color
  )
}

export function isPawnMoveLegal({ fromPosition, toPosition, board }) {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  const targetPiece = board[toPosition.x][toPosition.y]
  const direction = piece.color === "white" ? -1 : 1
  const startRow = piece.color === "white" ? 6 : 1

  return (
    isForwardMove({ fromPosition, toPosition, targetPiece, direction }) ||
    isInitialMove({ fromPosition, toPosition, board, direction, startRow }) ||
    isDiagonalCapture({
      fromPosition,
      toPosition,
      piece,
      targetPiece,
      direction
    })
  )
}
