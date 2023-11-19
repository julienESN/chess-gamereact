import React, { memo, useCallback } from "react"
import ChessPiece from "./ChessPiece"
import { useChess } from "../context/ChessContext"

const isDarkSquare = (position) => (position.x + position.y) % 2 === 1
const getSquareClass = (isDark) =>
  `${
    isDark ? "bg-lime-800" : "bg-lime-100"
  } w-[6vw] h-[10vh] flex justify-center items-center relative`
const getRankLabel = (y) => 8 - y
const getFileLabel = (x) => String.fromCharCode(97 + x)
const Square = ({ piece, position }) => {
  const { handleSquareClick } = useChess()
  const handleClick = useCallback(() => {
    console.log("Clic sur la case avec", { position, piece })
    handleSquareClick(position, piece)
  }, [position, piece, handleSquareClick])
  const darkSquare = isDarkSquare(position)
  const squareClass = getSquareClass(darkSquare)
  const rankLabel = position.y === 0 ? getRankLabel(position.x) : ""
  const fileLabel = position.x === 7 ? getFileLabel(position.y) : ""
  const labelFontSize = `calc(0.75vw + 0.75vh)`

  return (
    <div className={squareClass} onClick={handleClick}>
      {piece && <ChessPiece piece={piece} />}
      {rankLabel && (
        <span
          className="absolute top-0 left-0"
          style={{ fontSize: labelFontSize }}>
          {rankLabel}
        </span>
      )}
      {fileLabel && (
        <span
          className="absolute bottom-0 right-0"
          style={{ fontSize: labelFontSize }}>
          {fileLabel}
        </span>
      )}
    </div>
  )
}

export default memo(Square)
