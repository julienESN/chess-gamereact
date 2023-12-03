import { useState, useCallback } from "react"
export const usePieceSelection = (canMove) => {
  const [selectedPiece, setSelectedPiece] = useState(null)
  const handlePieceSelection = useCallback(
    (piece) => {
      if (piece && canMove(piece)) {
        setSelectedPiece(piece)
      }
    },
    [canMove]
  )

  return { selectedPiece, handlePieceSelection, setSelectedPiece }
}
