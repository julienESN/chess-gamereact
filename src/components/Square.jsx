import React, { memo } from "react"
import ChessPiece from "./ChessPiece"
import { useChessContext } from "../context/ChessContext"

const isDarkSquare = (position) => (position.x + position.y) % 2 === 1
const getSquareClass = (isDark) => (isDark ? "bg-lime-800" : "bg-lime-100")
const getRankLabel = (y) => 8 - y
const getFileLabel = (x) => String.fromCharCode(97 + x)
const RankLabel = ({ x, label }) => {
  const labelFontSize = `calc(0.75vw + 0.75vh)`

  return x === 7 ? (
    <span
      className="absolute bottom-0 right-0"
      style={{ fontSize: labelFontSize }}>
      {label}
    </span>
  ) : null
}
const FileLabel = ({ y, label }) => {
  const labelFontSize = `calc(0.75vw + 0.75vh)`

  return y === 0 ? (
    <span className="absolute top-0 left-0" style={{ fontSize: labelFontSize }}>
      {label}
    </span>
  ) : null
}
const Square = ({ piece, position }) => {
  const { handleSquareClick } = useChessContext()
  const handleClick = () => handleSquareClick(position, piece)
  const squareClass = getSquareClass(isDarkSquare(position))

  return (
    <div
      className={`${squareClass} w-[6vw] h-[10vh] flex justify-center items-center relative`}
      onClick={handleClick}>
      {piece && <ChessPiece piece={piece} />}
      <FileLabel y={position.y} label={getRankLabel(position.x)} />
      <RankLabel x={position.x} label={getFileLabel(position.y)} />
    </div>
  )
}

export default memo(Square)
