import React, { useMemo } from "react"
import { useChess } from "../context/ChessContext"
import Square from "./Square"

const ChessBoard = () => {
  const { board } = useChess()
  const renderedBoard = useMemo(
    () =>
      board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((piece, cellIndex) => (
            <Square
              key={`${rowIndex}-${cellIndex}`}
              piece={piece}
              position={{ x: rowIndex, y: cellIndex }}
            />
          ))}
        </div>
      )),
    [board]
  )

  return <div className="mx-auto max-w-[90vw]">{renderedBoard}</div>
}

export default ChessBoard
