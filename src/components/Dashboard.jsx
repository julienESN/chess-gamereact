import React, { memo } from "react"
import { useChess } from "../context/ChessContext"
import AlgebraicNotationDisplay from "./AlgebraicNotationDisplay"
const Dashboard = () => {
  const { gameStatus, startGame, resetGame } = useChess()

  return (
    <div className="dashboard">
      <AlgebraicNotationDisplay />
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
  )
}

export default memo(Dashboard)
