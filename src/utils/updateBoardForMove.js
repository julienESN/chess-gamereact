export const updateBoardForMove = ({
  board,
  fromPosition,
  toPosition,
  piece
}) => {
  const newBoard = [...board]
  newBoard[fromPosition.x][fromPosition.y] = null
  newBoard[toPosition.x][toPosition.y] = piece

  return newBoard
}
