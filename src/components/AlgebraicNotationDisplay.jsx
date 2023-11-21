import React from "react"
import { useChess } from "../context/ChessContext"

const AlgebraicNotationDisplay = () => {
    const { moveHistory } = useChess()

    return (
        <div>
            <h3>Mouvements en Notation Algébrique :</h3>
            <ul>
                {moveHistory.map((notation, index) => (
                    <li key={index}>{notation}</li>
                ))}
            </ul>
        </div>
    )
}

export default AlgebraicNotationDisplay
