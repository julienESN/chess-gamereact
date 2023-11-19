import React, { memo } from "react"
import { useChess } from "../context/ChessContext"
import Timer from "./Timer"
const Dashboard = () => {
  const { gameStatus, startGame, resetGame } = useChess()

  return (
    <div className="dashboard">
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

      <Timer />
    </div>
  )
}

export default memo(Dashboard)
