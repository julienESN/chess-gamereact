export const isMoveLegal =
  (moveLegalityFunctions, state) => (pieceToMove, toPosition) => {
    if (!pieceToMove || !pieceToMove.type) {
      return false
    }

    const moveCheckFunction =
      moveLegalityFunctions[pieceToMove.type.toLowerCase()]

    if (!moveCheckFunction) {
      return false
    }

    return moveCheckFunction({
      fromPosition: pieceToMove.position,
      toPosition,
      board: state.board
    })
  }
