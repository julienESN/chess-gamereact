export const isPathClear = ({ fromPosition, toPosition, board, delta }) => {
  let checkX = fromPosition.x + delta.x
  let checkY = fromPosition.y + delta.y

  while (checkX !== toPosition.x || checkY !== toPosition.y) {
    if (board[checkX][checkY]) {
      return false
    }

    checkX += delta.x
    checkY += delta.y
  }

  return true
}

export const calculateDirection = (from, to) => {
  if (to - from === 0) {
    return 0
  }

  return to - from > 0 ? 1 : -1
}
