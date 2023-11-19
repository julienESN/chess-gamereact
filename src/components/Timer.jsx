import React from "react"
import { useChess } from "../context/ChessContext"

const Timer = () => {
  const { playerTimes } = useChess()

  return (
    <div className="timer">
      <div>Temps Joueur 1: {playerTimes.player1}</div>
      <div>Temps Joueur 2: {playerTimes.player2}</div>
    </div>
  )
}

export default Timer
