import { INITIAL_LAYOUT, PIECES } from "./constants"

const createChessPiece = (pieceCode, x, y) => {
  if (!pieceCode) {
    return null
  }

  const color = pieceCode.startsWith("w") ? "white" : "black"
  const pieceConfig = PIECES[pieceCode[1].toLowerCase()]

  return {
    type: pieceConfig.type,
    color,
    position: { x, y },
    imagePath: `${pieceConfig.imagePath + (color === "white" ? "w" : "b")}.svg`
  }
}

export const createInitialBoard = () =>
  INITIAL_LAYOUT.map((row, x) =>
    row.map((pieceCode, y) => createChessPiece(pieceCode, x, y))
  )

export default createInitialBoard
