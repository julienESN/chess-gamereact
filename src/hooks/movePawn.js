/* eslint-disable line-comment-position */
/* eslint-disable no-inline-comments */
// Vérifie si un mouvement est un déplacement en avant valide pour un pion.
const createIsForwardMove =
  (direction, targetPiece) =>
  ({ fromPosition, toPosition }) =>
    fromPosition.y === toPosition.y && // Même rangée (pas de changement en y)
    fromPosition.x + direction === toPosition.x && // Avance d'une case dans la bonne direction
    !targetPiece // La case cible doit être vide
// Vérifie si le mouvement est le premier mouvement de deux cases d'un pion.
const createIsInitialMove =
  (direction, startRow, board) =>
  ({ fromPosition, toPosition }) =>
    fromPosition.x === startRow && // Le pion est sur sa ligne de départ
    fromPosition.x + 2 * direction === toPosition.x && // Le pion avance de deux cases
    !board[toPosition.x][toPosition.y] && // La case cible est vide
    !board[fromPosition.x + direction][fromPosition.y] // La case intermédiaire est vide
// Vérifie si un mouvement diagonal d'un pion est une capture valide.
const createIsDiagonalCapture =
  (direction, piece, board) =>
  ({ fromPosition, toPosition }) => {
    const targetPiece = board[toPosition.x][toPosition.y]

    return (
      Math.abs(fromPosition.y - toPosition.y) === 1 && // Déplacement d'une case en y (diagonale)
      fromPosition.x + direction === toPosition.x && // Déplacement d'une case dans la bonne direction en x
      targetPiece && // La case cible est occupée
      targetPiece.color !== piece.color // La pièce cible est de couleur opposée
    )
  }
// Combine plusieurs vérifications de légalité de mouvement.
const combineChecks = (checks) => (params) =>
  checks.some((check) => check(params)) // Renvoie vrai si une des vérifications est vraie

// Détermine si un mouvement de pion est légal.
export const isPawnMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  const direction = piece.color === "white" ? -1 : 1 // Définit la direction basée sur la couleur
  const startRow = piece.color === "white" ? 6 : 1 // Définit la ligne de départ basée sur la couleur
  const targetPiece = board[toPosition.x][toPosition.y]
  const checks = [
    createIsForwardMove(direction, targetPiece),
    createIsInitialMove(direction, startRow, board),
    createIsDiagonalCapture(direction, piece, board)
  ]

  return combineChecks(checks)({ fromPosition, toPosition })
}
