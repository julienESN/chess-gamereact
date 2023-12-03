import React, { memo } from "react"
import { useChessContext } from "../context/ChessContext"
import AlgebraicNotationDisplay from "./AlgebraicNotationDisplay"
import CapturedPiecesDisplay from "./CapturedPiecesDisplay"
const Dashboard = () => {
  const { gameStatus, startGame, resetGame } = useChessContext()

  return (
    <div className="dashboard flex flex-col items-center">
      <div className="flex w-full justify-between">
        <AlgebraicNotationDisplay />
        <div className="flex-grow" />
        <CapturedPiecesDisplay />
      </div>
      <div className="game-controls w-full flex justify-center">
        {gameStatus === "waiting" && (
          <button onClick={startGame} className="start-button">
            Commencer la Partie
          </button>
        )}
        {gameStatus !== "waiting" && (
          <button onClick={resetGame} className="reset-button">
            Réinitialiser le Jeu
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(Dashboard)
