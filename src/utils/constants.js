export const INITIAL_LAYOUT = [
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
  Array(8).fill("bP"),
  ...Array(4).fill(Array(8).fill(null)),
  Array(8).fill("wP"),
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
]

export const PIECES = {
  r: { type: "rook", imagePath: "/assets/rook/R" },
  n: { type: "knight", imagePath: "/assets/knight/N" },
  b: { type: "bishop", imagePath: "/assets/bishop/B" },
  q: { type: "queen", imagePath: "/assets/queen/Q" },
  k: { type: "king", imagePath: "/assets/king/K" },
  p: { type: "pawn", imagePath: "/assets/pawn/P" }
}
