/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
// Vérifie si un mouvement de fou est légal.
export const isBishopMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  if (
    Math.abs(fromPosition.x - toPosition.x) !==
    Math.abs(fromPosition.y - toPosition.y)
  ) {
    return false // Vérifie si le mouvement est bien en diagonale
  }

  const deltaX = toPosition.x > fromPosition.x ? 1 : -1 // Détermine la direction en x
  const deltaY = toPosition.y > fromPosition.y ? 1 : -1 // Détermine la direction en y

  let checkX = fromPosition.x + deltaX
  let checkY = fromPosition.y + deltaY

  // Vérifie que toutes les cases sur le chemin sont vides
  while (checkX !== toPosition.x && checkY !== toPosition.y) {
    if (board[checkX][checkY]) {
      return false
    }

    checkX += deltaX
    checkY += deltaY
  }

  const targetPiece = board[toPosition.x][toPosition.y]

  // Vérifie que la case cible est soit vide, soit occupée par une pièce de couleur opposée
  if (targetPiece && targetPiece.color === piece.color) {
    return false
  }

  return true
}
