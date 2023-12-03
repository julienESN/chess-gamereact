import { createInitialBoard } from "../utils/createInitialBoard"
import { updateBoardForMove } from "../utils/updateBoardForMove"
import { updateMoveHistory } from "../utils/updateMoveHistory"
export const SET_BOARD = "SET_BOARD"
export const START_GAME = "START_GAME"
export const CHANGE_PLAYER = "CHANGE_PLAYER"
export const RESET_GAME = "RESET_GAME"
export const MOVE_PIECE = "MOVE_PIECE"
export const CAPTURE_PIECE = "CAPTURE_PIECE"
const KING_PIECE_TYPE = "king"
export const chessReducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD:
      return { ...state, board: action.payload }

    case START_GAME:
      return { ...state, gameStatus: "playing" }

    case RESET_GAME:
      return getInitialState()

    case MOVE_PIECE: {
      const { fromPosition, toPosition, piece, notation } = action.payload
      const newBoard = updateBoardForMove({
        board: state.board,
        fromPosition,
        toPosition,
        piece
      })
      const newMoveHistory = updateMoveHistory(state.moveHistory, notation)

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        moveHistory: newMoveHistory
      }
    }

    case CAPTURE_PIECE: {
      const { player, capturedPiece } = action.payload

      if (capturedPiece.type === KING_PIECE_TYPE) {
        return { ...getInitialState(), gameStatus: "reset" }
      }

      const playerKey = player === 1 ? "player1" : "player2"

      return {
        ...state,
        capturedPieces: {
          ...state.capturedPieces,
          [playerKey]: [...state.capturedPieces[playerKey], capturedPiece]
        }
      }
    }

    default:
      return state
  }
}
export const getInitialState = () => ({
  board: createInitialBoard(),
  currentPlayer: 1,
  capturedPieces: { player1: [], player2: [] },
  playerTimes: { player1: 0, player2: 0 },
  gameStatus: "waiting",
  moveHistory: []
})
