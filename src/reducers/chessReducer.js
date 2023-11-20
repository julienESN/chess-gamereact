import { createInitialBoard } from "../utils/createInitialBoard"

export const SET_BOARD = "SET_BOARD"
export const START_GAME = "START_GAME"
export const CHANGE_PLAYER = "CHANGE_PLAYER"
export const RESET_GAME = "RESET_GAME"
export const MOVE_PIECE = "MOVE_PIECE"
export const chessReducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD:
      return { ...state, board: action.payload }

    case START_GAME:
      return { ...state, gameStatus: "playing" }

    case RESET_GAME:
      return {
        board: createInitialBoard(),
        currentPlayer: 1,
        capturedPieces: { player1: [], player2: [] },
        playerTimes: { player1: 0, player2: 0 },
        gameStatus: "waiting",
        moveHistory: []
      }

    case MOVE_PIECE: {
      const { fromPosition, toPosition, piece } = action.payload
      const newBoard = [...state.board]
      newBoard[fromPosition.x][fromPosition.y] = null
      newBoard[toPosition.x][toPosition.y] = piece

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        moveHistory: [...state.moveHistory, { fromPosition, toPosition }]
      }
    }

    default:
      return state
  }
}
export const initialState = {
  board: createInitialBoard(),
  currentPlayer: 1,
  capturedPieces: { player1: [], player2: [] },
  playerTimes: { player1: 0, player2: 0 },
  gameStatus: "waiting",
  moveHistory: []
}
