export const createInitialBoard = () => {
  const initialPieces = {
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king",
    p: "pawn",
    R: "Rook",
    N: "Knight",
    B: "Bishop",
    Q: "Queen",
    K: "King",
    P: "Pawn"
  }
  const createRow = (pieces, rowIndex) =>
    pieces.map((piece, colIndex) => ({
      type: initialPieces[piece],
      color: piece === piece.toUpperCase() ? "white" : "black",
      position: { x: rowIndex, y: colIndex }
    }))

  return [
    createRow(["r", "n", "b", "q", "k", "b", "n", "r"], 0),
    createRow(["p", "p", "p", "p", "p", "p", "p", "p"], 1),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    createRow(["P", "P", "P", "P", "P", "P", "P", "P"], 6),
    createRow(["R", "N", "B", "Q", "K", "B", "N", "R"], 7)
  ]
}
