import React, { memo } from "react"

const ChessPiece = ({ piece }) => {
  const pieceUnicode = {
    Rook: "♖",
    Knight: "♘",
    Bishop: "♗",
    Queen: "♕",
    King: "♔",
    Pawn: "♙",
    rook: "♜",
    knight: "♞",
    bishop: "♝",
    queen: "♛",
    king: "♚",
    pawn: "♟︎"
  }
  const unicode = pieceUnicode[piece.type]
  const fontSize = `calc(2vw + 2vh)`

  return (
    <div
      className={`flex items-center justify-center h-full w-full ${piece.color === "white" ? "text-gray-800" : "text-gray-300"
        }`}
      style={{ fontSize }}>
      {unicode}
    </div>
  )
}

export default memo(ChessPiece)
