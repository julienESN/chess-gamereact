export const createInitialBoard = () => {
  const PIECES = {
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king",
    p: "pawn"
  }
  const COLORS = { upper: "white", lower: "black" }
  const createChessPiece = (piece, x, y) => ({
    type: PIECES[piece.toLowerCase()],
    color: piece === piece.toUpperCase() ? COLORS.upper : COLORS.lower,
    position: { x, y }
  })
  const createRow = (pieces, rowIndex) =>
    pieces.map((piece, colIndex) => createChessPiece(piece, rowIndex, colIndex))
  const emptyRow = () => new Array(8).fill(null)

  return [
    createRow(["r", "n", "b", "q", "k", "b", "n", "r"], 0),
    createRow(["p", "p", "p", "p", "p", "p", "p", "p"], 1),
    emptyRow(),
    emptyRow(),
    emptyRow(),
    emptyRow(),
    createRow(["P", "P", "P", "P", "P", "P", "P", "P"], 6),
    createRow(["R", "N", "B", "Q", "K", "B", "N", "R"], 7)
  ]
}
