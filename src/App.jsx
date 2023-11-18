import React from "react"
import { ChessProvider } from "../src/context/ChessContext"
import Board from "../src/components/Board"
import Dashboard from "../src/components/Dashboard"
const App = () => (
  <ChessProvider>
    <div className="app h-screen flex flex-col justify-center items-center">
      <Dashboard />
      <Board />
    </div>
  </ChessProvider>
)


export default App
