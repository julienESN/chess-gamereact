function isForwardMove({ fromPosition, toPosition, targetPiece, direction }) {
  const isMoveForward =
    fromPosition.y === toPosition.y &&
    fromPosition.x + direction === toPosition.x &&
    !targetPiece

  console.log(`isForwardMove: ${isMoveForward}`, {
    fromPosition,
    toPosition,
    targetPiece,
    direction
  })

  return isMoveForward
}
function isInitialMove({
  fromPosition,
  toPosition,
  board,
  direction,
  startRow
}) {
  const isMoveInitial =
    fromPosition.x === startRow &&
    fromPosition.x + 2 * direction === toPosition.x &&
    !board[toPosition.x][toPosition.y] &&
    !board[fromPosition.x + direction][fromPosition.y]

  console.log(`isInitialMove: ${isMoveInitial}`, {
    fromPosition,
    toPosition,
    board,
    direction,
    startRow
  })

  return isMoveInitial
}

function isDiagonalCapture({
  fromPosition,
  toPosition,
  piece,
  targetPiece,
  direction
}) {
  const isCaptureDiagonal =
    Math.abs(fromPosition.y - toPosition.y) === 1 &&
    fromPosition.x + direction === toPosition.x &&
    targetPiece &&
    targetPiece.color !== piece.color

  console.log(`isDiagonalCapture: ${isCaptureDiagonal}`, {
    fromPosition,
    toPosition,
    piece,
    targetPiece,
    direction
  })

  return isCaptureDiagonal
}

export function isPawnMoveLegal({ fromPosition, toPosition, board }) {
  const piece = board[fromPosition.x][fromPosition.y]
  const targetPiece = board[toPosition.x][toPosition.y]
  const direction = piece.color === "white" ? -1 : 1
  const startRow = piece.color === "white" ? 6 : 1
  const moveParams = {
    fromPosition,
    toPosition,
    targetPiece,
    direction,
    startRow,
    piece,
    board
  }
  const isLegal =
    isForwardMove(moveParams) ||
    isInitialMove(moveParams) ||
    isDiagonalCapture(moveParams)

  console.log(`isPawnMoveLegal: ${isLegal}`, moveParams)

  return isLegal
}
