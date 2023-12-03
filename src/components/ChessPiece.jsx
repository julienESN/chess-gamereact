// ChessPiece.jsx
import React, { memo } from "react"

const ChessPiece = ({ piece }) => {
  if (!piece) {
    return null
  }

  return (
    <div className={`flex items-center justify-center h-full w-full`}>
      <img src={piece.imagePath} alt={`${piece.color} ${piece.type}`} />
    </div>
  )
}

export default memo(ChessPiece)
