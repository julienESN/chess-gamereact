import React from "react"
import { useChessContext } from "../context/ChessContext"

const CapturedPiecesDisplay = () => {
  const { capturedPieces } = useChessContext()

  return (
    <div>
      <h3>Pièces Capturées :</h3>
      <div className="flex">
        <div>
          <h4>Joueur 1:</h4>
          <ul>
            {capturedPieces.player1.map((piece, index) => (
              <li key={index}>{piece.type}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Joueur 2:</h4>
          <ul>
            {capturedPieces.player2.map((piece, index) => (
              <li key={index}>{piece.type}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CapturedPiecesDisplay
