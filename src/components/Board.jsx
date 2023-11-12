import React from "react"
import { useChess } from "../context/ChessContext"
import Square from "./Square"

const Board = () => {
  const { board } = useChess()

  return (
    <div className="mx-auto max-w-[90vw]">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((piece, cellIndex) => (
            <Square
              key={`${rowIndex}-${cellIndex}`}
              piece={piece}
              position={{ x: rowIndex, y: cellIndex }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
