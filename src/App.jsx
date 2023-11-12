import React from "react"
import { ChessProvider } from "../src/context/ChessContext"
import Board from "../src/components/Board"
const App = () => (
  <ChessProvider>
    <div className="app h-screen flex justify-center items-center">
      <Board />
    </div>
  </ChessProvider>
)

export default App
