import React from "react"
import { useChess } from "../context/ChessContext"

const Dashboard = () => {
  const { gameStatus, startGame, resetGame, playerTimes } = useChess()

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

      <div className="timer">
        <div>Temps Joueur 1: {playerTimes.player1}</div>
        <div>Temps Joueur 2: {playerTimes.player2}</div>
      </div>
    </div>
  )
}

export default Dashboard
