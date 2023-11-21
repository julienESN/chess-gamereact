import React from "react"
import { ChessProvider } from "../src/context/ChessContext"
import ChessBoard from "../src/components/ChessBoard"
import Dashboard from "../src/components/Dashboard"
const App = () => (
  <ChessProvider>
    <div className="app h-screen flex flex-col justify-center items-center">
      <Dashboard />
      <ChessBoard />
    </div>
  </ChessProvider>
)


export default App

