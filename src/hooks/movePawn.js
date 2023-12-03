import { isPathClear } from "../utils/chessUtils"

const PAWN_MOVES = {
  white: {
    forward: [
      { x: -1, y: 0 },
      { x: -2, y: 0 }
    ],
    capture: [
      { x: -1, y: -1 },
      { x: -1, y: 1 }
    ]
  },
  black: {
    forward: [
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    capture: [
      { x: 1, y: -1 },
      { x: 1, y: 1 }
    ]
  }
}

export const isPawnMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  const direction = piece.color === "white" ? "white" : "black"
  const forwardMoves = PAWN_MOVES[direction].forward
  const captureMoves = PAWN_MOVES[direction].capture
  const isForwardMove = forwardMoves.some((move) => {
    const targetX = fromPosition.x + move.x
    const targetY = fromPosition.y
    const isStartRow =
      piece.color === "white" ? fromPosition.x === 6 : fromPosition.x === 1
    const isTwoStepMove = Math.abs(move.x) === 2
    const pathDelta = { x: move.x / Math.abs(move.x), y: 0 }

    return (
      toPosition.x === targetX &&
      toPosition.y === targetY &&
      !board[targetX][targetY] &&
      (!isTwoStepMove ||
        (isTwoStepMove &&
          isStartRow &&
          isPathClear({ fromPosition, toPosition, board, delta: pathDelta })))
    )
  })

  if (isForwardMove) {
    return true
  }

  const isCaptureMove = captureMoves.some((move) => {
    const targetX = fromPosition.x + move.x
    const targetY = fromPosition.y + move.y
    const targetPiece = board[targetX][targetY]

    return (
      toPosition.x === targetX &&
      toPosition.y === targetY &&
      targetPiece &&
      targetPiece.color !== piece.color
    )
  })

  return isCaptureMove
}
